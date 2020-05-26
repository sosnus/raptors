package pl.raptors.ra_back.service.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.movement.MapArea;
import pl.raptors.ra_back.domain.type.AreaType;
import pl.raptors.ra_back.repository.movement.MapAreaRepository;
import pl.raptors.ra_back.repository.type.AreaTypeRepository;
import pl.raptors.ra_back.service.CRUDService;
import pl.raptors.ra_back.service.movement.MapAreaService;

import java.util.List;
import java.util.Objects;

@Service
public class AreaTypeService implements CRUDService<AreaType> {

    @Autowired
    AreaTypeRepository areaTypeRepository;
    @Autowired
    MapAreaService mapAreaService;
    @Autowired
    MapAreaRepository mapAreaRepository;

    @Override
    public List<AreaType> getAll() {
        return areaTypeRepository.findAll();
    }

    @Override
    public AreaType updateOne(AreaType areaType) {
        List<MapArea> areaList = mapAreaService.getAreasByType(this.getOne(areaType.getId()));
        for (MapArea area : areaList) {
            area.setType(areaType);
            mapAreaService.updateOne(area);
            mapAreaRepository.save(area);
        }
        return areaTypeRepository.save(areaType);
    }

    @Override
    public AreaType addOne(AreaType areaType) {
        AreaType areaTypeAlreadyExists = areaTypeRepository.findByName(areaType.getName());
        if (Objects.isNull((areaTypeAlreadyExists))) {
            areaTypeRepository.save(areaType);
            return areaType;
        }
        return areaTypeAlreadyExists;
    }

    @Override
    public AreaType getOne(String id) {
        return areaTypeRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteOne(AreaType areaType) {
        AreaType areaTypeToDelete = areaTypeRepository.findByName(areaType.getName());
        if (!Objects.isNull((areaTypeToDelete))) {
            List<MapArea> areaList = mapAreaService.getAreasByType(this.getOne(areaType.getId()));
            mapAreaService.deleteAll(areaList);
            areaTypeRepository.delete(areaTypeToDelete);
        }
    }

    @Override
    public void deleteAll(List<AreaType> areaTypeList) {
        for (AreaType areaType : areaTypeList) {
            this.deleteOne(areaType);
        }
    }
}

package pl.raptors.raptorsRobotsApp.service.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.MapArea;
import pl.raptors.raptorsRobotsApp.domain.type.AreaType;
import pl.raptors.raptorsRobotsApp.repository.movement.MapAreaRepository;
import pl.raptors.raptorsRobotsApp.repository.type.AreaTypeRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;
import pl.raptors.raptorsRobotsApp.service.movement.MapAreaService;
import pl.raptors.raptorsRobotsApp.service.movement.MovementMapService;

import java.util.List;
import java.util.Objects;
//@PreAuthorize("hasAuthority('ROLE_ADMIN')")
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
            areaTypeRepository.delete(areaTypeToDelete);
        }
    }
}

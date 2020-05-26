package pl.raptors.ra_back.service.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.movement.Stand;
import pl.raptors.ra_back.domain.type.StandType;
import pl.raptors.ra_back.repository.type.StandTypeRepository;
import pl.raptors.ra_back.service.CRUDService;
import pl.raptors.ra_back.service.movement.StandService;

import java.util.List;
import java.util.Objects;

@Service
public class StandTypeService implements CRUDService<StandType> {

    @Autowired
    private StandTypeRepository repository;
    @Autowired
    private StandService standService;

    @Override
    public List<StandType> getAll() {
        return repository.findAll();
    }

    @Override
    public StandType updateOne(StandType standType) {
        List<Stand> standList = standService.getByStandType(this.getOne(standType.getId()));
        for (Stand stand : standList) {
            stand.setStandType(standType);
            standService.updateOne(stand);
        }
        return repository.save(standType);
    }

    @Override
    public StandType addOne(StandType standType) {
        StandType standTypeAlreadyExists = repository.findByName(standType.getName());
        if (Objects.isNull((standTypeAlreadyExists))) {
            repository.save(standType);
            return standType;
        }
        return standTypeAlreadyExists;
    }

    @Override
    public StandType getOne(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public void deleteOne(StandType standType) {
        StandType standTypeToDelete = repository.findByName(standType.getName());
        if (!Objects.isNull((standTypeToDelete))) {
            List<Stand> standList = standService.getByStandType(this.getOne(standType.getId()));
            standService.deleteAll(standList);
            repository.delete(standTypeToDelete);
        }
    }

    @Override
    public void deleteAll(List<StandType> standTypeList) {
        for (StandType standType : standTypeList) {
            this.deleteOne(standType);
        }
    }
}

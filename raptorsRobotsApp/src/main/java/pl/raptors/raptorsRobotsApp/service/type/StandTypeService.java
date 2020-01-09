package pl.raptors.raptorsRobotsApp.service.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.Stand;
import pl.raptors.raptorsRobotsApp.domain.type.StandType;
import pl.raptors.raptorsRobotsApp.repository.type.StandTypeRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;
import pl.raptors.raptorsRobotsApp.service.movement.StandService;

import java.util.List;
import java.util.Objects;
//@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_SERVICEMAN')")
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
            repository.delete(standTypeToDelete);
        }
    }
}

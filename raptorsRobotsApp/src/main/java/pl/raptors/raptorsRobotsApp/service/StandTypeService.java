package pl.raptors.raptorsRobotsApp.service;

import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.type.StandType;
import pl.raptors.raptorsRobotsApp.repository.type.StandTypeRepository;

import java.util.List;
import java.util.Objects;

@Service
public class StandTypeService {

    private StandTypeRepository repository;

    public StandTypeService(StandTypeRepository repository) {
        this.repository = repository;
    }

    public List<StandType> getAll() {
        return repository.findAll();
    }

    public StandType addOne(StandType standType) {
        StandType standTypeAlreadyExists = repository.findByName(standType.getName());
        if (Objects.isNull((standTypeAlreadyExists))) {
            repository.save(standType);
            return standType;
        }
        return standTypeAlreadyExists;
    }

    public void deleteOne(StandType standType) {
        StandType standTypeToDelete = repository.findByName(standType.getName());
        if (!Objects.isNull((standTypeToDelete))) {
            repository.delete(standTypeToDelete);
        }
    }

}

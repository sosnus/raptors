package pl.raptors.raptorsRobotsApp.service.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.type.PropulsionType;
import pl.raptors.raptorsRobotsApp.repository.type.PropulsionTypeRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;
import java.util.Objects;

@Service
public class PropulsionTypeService implements CRUDService<PropulsionType> {
    @Autowired
    PropulsionTypeRepository propulsionTypeRepository;

    @Override
    public PropulsionType addOne(PropulsionType PropulsionType) {
        PropulsionType propulsionTypeAlreadyExists = propulsionTypeRepository.findByName(PropulsionType.getName());
        if (Objects.isNull((propulsionTypeAlreadyExists))) {
            propulsionTypeRepository.save(PropulsionType);
            return PropulsionType;
        }
        return propulsionTypeAlreadyExists;
    }

    @Override
    public PropulsionType getOne(String id) {
        return propulsionTypeRepository.findById(id).orElse(null);
    }

    @Override
    public List<PropulsionType> getAll() {
        return propulsionTypeRepository.findAll();
    }

    @Override
    public PropulsionType updateOne(PropulsionType PropulsionType) {
        return propulsionTypeRepository.save(PropulsionType);
    }

    @Override
    public void deleteOne(PropulsionType PropulsionType) {
        PropulsionType PropulsionTypeToDelete = propulsionTypeRepository.findByName(PropulsionType.getName());
        if (!Objects.isNull((PropulsionTypeToDelete))) {
            propulsionTypeRepository.delete(PropulsionTypeToDelete);
        }
    }
}

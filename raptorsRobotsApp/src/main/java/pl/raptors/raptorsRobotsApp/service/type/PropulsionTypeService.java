package pl.raptors.raptorsRobotsApp.service.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotModel;
import pl.raptors.raptorsRobotsApp.domain.type.PropulsionType;
import pl.raptors.raptorsRobotsApp.repository.type.PropulsionTypeRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;
import pl.raptors.raptorsRobotsApp.service.robots.RobotModelService;

import java.util.List;
import java.util.Objects;
//@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
@Service
public class PropulsionTypeService implements CRUDService<PropulsionType> {

    @Autowired
    PropulsionTypeRepository propulsionTypeRepository;
    @Autowired
    RobotModelService robotModelService;

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
    public PropulsionType updateOne(PropulsionType propulsionType) {
        List<RobotModel> modelList = robotModelService.getByPropulsionType(this.getOne(propulsionType.getId()));
        for (RobotModel model : modelList) {
            model.setPropulsionType(propulsionType);
            robotModelService.updateOne(model);
        }
        return propulsionTypeRepository.save(propulsionType);
    }

    @Override
    public void deleteOne(PropulsionType PropulsionType) {
        PropulsionType PropulsionTypeToDelete = propulsionTypeRepository.findByName(PropulsionType.getName());
        if (!Objects.isNull((PropulsionTypeToDelete))) {
            propulsionTypeRepository.delete(PropulsionTypeToDelete);
        }
    }
}

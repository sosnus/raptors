package pl.raptors.raptorsRobotsApp.service.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotModel;
import pl.raptors.raptorsRobotsApp.domain.type.PropulsionType;
import pl.raptors.raptorsRobotsApp.repository.robots.RobotModelRepository;
import pl.raptors.raptorsRobotsApp.repository.type.PropulsionTypeRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;
import pl.raptors.raptorsRobotsApp.service.robots.RobotModelService;

import java.util.List;
import java.util.Objects;

@Service
public class PropulsionTypeService implements CRUDService<PropulsionType> {

    @Autowired
    PropulsionTypeRepository propulsionTypeRepository;
    @Autowired
    RobotModelService robotModelService;
    @Autowired
    RobotModelRepository robotModelRepository;

    @Override
    public PropulsionType addOne(PropulsionType propulsionType) {
        PropulsionType propulsionTypeAlreadyExists = propulsionTypeRepository.findByName(propulsionType.getName());
        if (Objects.isNull((propulsionTypeAlreadyExists))) {
            propulsionTypeRepository.save(propulsionType);
            return propulsionType;
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
    public void deleteOne(PropulsionType propulsionType) {
        PropulsionType PropulsionTypeToDelete = propulsionTypeRepository.findByName(propulsionType.getName());
        if (!Objects.isNull((PropulsionTypeToDelete))) {
            List<RobotModel> modelList = robotModelService.getByPropulsionType(this.getOne(propulsionType.getId()));
            robotModelService.deleteAll(modelList);
            propulsionTypeRepository.delete(PropulsionTypeToDelete);
        }
    }

    @Override
    public void deleteAll(List<PropulsionType> propulsionTypeList) {
        for (PropulsionType propulsionType : propulsionTypeList) {
            this.deleteOne(propulsionType);
        }
    }
}

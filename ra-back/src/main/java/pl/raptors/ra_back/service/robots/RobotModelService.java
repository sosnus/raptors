package pl.raptors.ra_back.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.robots.BatteryType;
import pl.raptors.ra_back.domain.robots.Robot;
import pl.raptors.ra_back.domain.robots.RobotModel;
import pl.raptors.ra_back.domain.type.PropulsionType;
import pl.raptors.ra_back.repository.robots.RobotModelRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.util.List;
import java.util.Objects;

@Service
public class RobotModelService implements CRUDService<RobotModel> {

    @Autowired
    RobotModelRepository robotModelRepository;
    @Autowired
    RobotService robotService;

    @Override
    public RobotModel addOne(RobotModel robotModel) {
        if (Objects.isNull((robotModelRepository.findByName(robotModel.getName())))) {
            robotModel.setId(robotModel.getName());
            return robotModelRepository.save(robotModel);
        }
        return robotModelRepository.findByName(robotModel.getName());
    }

    @Override
    public RobotModel getOne(String id) {
        return robotModelRepository.findById(id).orElse(null);
    }

    @Override
    public List<RobotModel> getAll() {
        return robotModelRepository.findAll();
    }

    @Override
    public RobotModel updateOne(RobotModel robotModel) {
        List<Robot> robotList = robotService.getByModel(this.getOne(robotModel.getId()));
        for (Robot robot : robotList) {
            robot.setModel(robotModel);
            robotService.updateOne(robot);
        }
        return robotModelRepository.save(robotModel);
    }

    @Override
    public void deleteOne(RobotModel robotModel) {
        List<Robot> robotList = robotService.getByModel(this.getOne(robotModel.getId()));
        robotService.deleteAll(robotList);
        robotModelRepository.delete(robotModel);
    }

    @Override
    public void deleteAll(List<RobotModel> robotModelList) {
        for (RobotModel robotModel : robotModelList) {
            this.deleteOne(robotModel);
        }
    }

    public List<RobotModel> getByPropulsionType(PropulsionType propulsionType) {
        return robotModelRepository.findAllByPropulsionType(propulsionType);
    }

    List<RobotModel> getByBatteryType(BatteryType batteryType) {
        return robotModelRepository.findAllByBatteryType(batteryType);
    }
}

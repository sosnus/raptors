package pl.raptors.raptorsRobotsApp.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.robots.BatteryType;
import pl.raptors.raptorsRobotsApp.domain.robots.Robot;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotModel;
import pl.raptors.raptorsRobotsApp.domain.type.PropulsionType;
import pl.raptors.raptorsRobotsApp.repository.robots.RobotModelRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;
@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
@Service
public class RobotModelService implements CRUDService<RobotModel> {

    @Autowired
    RobotModelRepository robotModelRepository;
    @Autowired
    RobotService robotService;

    @Override
    public RobotModel addOne(RobotModel robotModel) {
        return robotModelRepository.save(robotModel);
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
        robotModelRepository.delete(robotModel);
    }

    public List<RobotModel> getByPropulsionType(PropulsionType propulsionType) {
        return robotModelRepository.findAllByPropulsionType(propulsionType);
    }

    List<RobotModel> getByBatteryType(BatteryType batteryType) {
        return robotModelRepository.findAllByBatteryType(batteryType);
    }
}

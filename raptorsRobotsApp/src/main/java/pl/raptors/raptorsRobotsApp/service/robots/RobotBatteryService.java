package pl.raptors.raptorsRobotsApp.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.robots.BatteryType;
import pl.raptors.raptorsRobotsApp.domain.robots.Robot;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotBattery;
import pl.raptors.raptorsRobotsApp.repository.robots.RobotBatteryRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

@Service
public class RobotBatteryService implements CRUDService<RobotBattery> {

    @Autowired
    RobotBatteryRepository robotBatteryRepository;
    @Autowired
    RobotService robotService;

    @Override
    public RobotBattery addOne(RobotBattery robotBattery) {
        return robotBatteryRepository.save(robotBattery);
    }

    @Override
    public RobotBattery getOne(String id) {
        return robotBatteryRepository.findById(id).orElse(null);
    }

    @Override
    public List<RobotBattery> getAll() {
        return robotBatteryRepository.findAll();
    }

    @Override
    public RobotBattery updateOne(RobotBattery robotBattery) {
        List<Robot> robotList = robotService.getByBattery(this.getOne(robotBattery.getId()));
        for (Robot robot : robotList) {
            robot.setBattery(robotBattery);
            robotService.updateOne(robot);
        }
        return robotBatteryRepository.save(robotBattery);
    }

    @Override
    public void deleteOne(RobotBattery robotBattery) {
        List<Robot> robotList = robotService.getByBattery(this.getOne(robotBattery.getId()));
        robotService.deleteAll(robotList);
        robotBatteryRepository.delete(robotBattery);
    }

    @Override
    public void deleteAll(List<RobotBattery> robotBatteryList) {
        for (RobotBattery robotBattery : robotBatteryList) {
            this.deleteOne(robotBattery);
        }
    }

    List<RobotBattery> getByType(BatteryType type) {
        return robotBatteryRepository.findAllByType(type);
    }
}

package pl.raptors.raptorsRobotsApp.repository.robots;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.robots.ExtraRobotElement;
import pl.raptors.raptorsRobotsApp.domain.robots.Robot;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotBattery;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotModel;
import pl.raptors.raptorsRobotsApp.domain.type.RobotStatus;

import java.util.List;

@Repository
public interface RobotRepository extends MongoRepository<Robot, String> {

    List<Robot> findAllByExtraRobotElement(ExtraRobotElement extraRobotElement);

    List<Robot> findAllByModel(RobotModel model);

    List<Robot> findAllByBattery(RobotBattery battery);

    List<Robot> findAllByStatusContaining(RobotStatus status);
}

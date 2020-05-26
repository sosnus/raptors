package pl.raptors.ra_back.repository.robots;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.robots.ExtraRobotElement;
import pl.raptors.ra_back.domain.robots.Robot;
import pl.raptors.ra_back.domain.robots.RobotBattery;
import pl.raptors.ra_back.domain.robots.RobotModel;
import pl.raptors.ra_back.domain.robots.RobotStatus;

import java.util.List;

@Repository
public interface RobotRepository extends MongoRepository<Robot, String> {

    List<Robot> findAllByExtraRobotElement(ExtraRobotElement extraRobotElement);

    List<Robot> findAllByModel(RobotModel model);

    List<Robot> findAllByBattery(RobotBattery battery);

    List<Robot> findAllByStatusContaining(RobotStatus status);
}

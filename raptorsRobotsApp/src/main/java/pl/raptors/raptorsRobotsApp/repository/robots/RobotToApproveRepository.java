package pl.raptors.raptorsRobotsApp.repository.robots;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.robots.*;
import pl.raptors.raptorsRobotsApp.domain.type.RobotStatus;

import java.util.List;

@Repository
public interface RobotToApproveRepository extends MongoRepository<RobotToApprove, String> {

    List<RobotToApprove> findAllByExtraRobotElement(ExtraRobotElement extraRobotElement);

    List<RobotToApprove> findAllByModel(RobotModel model);

    List<RobotToApprove> findAllByBattery(RobotBattery battery);

    List<RobotToApprove> findAllByStatusContaining(RobotStatus status);
}
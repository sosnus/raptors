package pl.raptors.ra_back.repository.robots;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.robots.*;
import pl.raptors.ra_back.domain.robots.RobotStatus;

import java.util.List;

@Repository
public interface RobotToApproveRepository extends MongoRepository<RobotToApprove, String> {

    List<RobotToApprove> findAllByExtraRobotElement(ExtraRobotElement extraRobotElement);

    List<RobotToApprove> findAllByModel(RobotModel model);

    List<RobotToApprove> findAllByBattery(RobotBattery battery);

    List<RobotToApprove> findAllByStatusContaining(RobotStatus status);
}

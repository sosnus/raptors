package pl.raptors.raptorsRobotsApp.repository.robots;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.robots.BatteryType;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotModel;
import pl.raptors.raptorsRobotsApp.domain.type.PropulsionType;

import java.util.List;

@Repository
public interface RobotModelRepository extends MongoRepository<RobotModel, String> {

    List<RobotModel> findAllByPropulsionType(PropulsionType propulsionType);

    List<RobotModel> findAllByBatteryType(BatteryType batteryType);
}

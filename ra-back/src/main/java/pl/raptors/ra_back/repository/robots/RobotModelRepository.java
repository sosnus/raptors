package pl.raptors.ra_back.repository.robots;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.robots.BatteryType;
import pl.raptors.ra_back.domain.robots.RobotModel;
import pl.raptors.ra_back.domain.type.PropulsionType;

import java.util.List;

@Repository
public interface RobotModelRepository extends MongoRepository<RobotModel, String> {

    RobotModel findByName(String name);

    List<RobotModel> findAllByPropulsionType(PropulsionType propulsionType);

    List<RobotModel> findAllByBatteryType(BatteryType batteryType);
}

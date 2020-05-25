package pl.raptors.raptorsRobotsApp.repository.robots;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.robots.BatteryType;

@Repository
public interface BatteryTypeRepository extends MongoRepository<BatteryType, String> {
}

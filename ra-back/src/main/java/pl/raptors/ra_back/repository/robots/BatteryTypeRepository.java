package pl.raptors.ra_back.repository.robots;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.robots.BatteryType;

@Repository
public interface BatteryTypeRepository extends MongoRepository<BatteryType, String> {
}

package pl.raptors.raptorsRobotsApp.repository.type;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.type.RobotStatus;

@Repository
public interface RobotStatusRepository extends MongoRepository<RobotStatus,String> {
    public RobotStatus findByName(String name);
}

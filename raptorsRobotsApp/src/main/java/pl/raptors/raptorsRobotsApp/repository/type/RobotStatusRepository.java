package pl.raptors.raptorsRobotsApp.repository.type;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.type.RobotStatus;

import java.util.List;

@Repository
public interface RobotStatusRepository extends MongoRepository<RobotStatus, String> {
    RobotStatus findByName(String name);
    List<RobotStatus> findAllByIdIn(List<String> ids);
}

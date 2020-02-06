package pl.raptors.raptorsRobotsApp.repository.robots;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.robots.Log;
import pl.raptors.raptorsRobotsApp.domain.robots.Robot;

import java.util.List;

@Repository
public interface LogRepository extends MongoRepository<Log, String> {
    List<Log> findAllByRobot_Id (String robotId);
}

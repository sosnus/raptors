package pl.raptors.ra_back.repository.type;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.robots.RobotStatus;

import java.util.List;

@Repository
public interface RobotStatusRepository extends MongoRepository<RobotStatus, String> {
    RobotStatus findByName(String name);
    List<RobotStatus> findAllByIdIn(List<String> ids);
}

package pl.raptors.raptorsRobotsApp.repository.movement;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementPath;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementPathPoint;

import java.util.List;

@Repository
public interface MovementPathPointRepository extends MongoRepository<MovementPathPoint, String> {
    List<MovementPathPoint> findAllByMovementPathId(String pathId);
}

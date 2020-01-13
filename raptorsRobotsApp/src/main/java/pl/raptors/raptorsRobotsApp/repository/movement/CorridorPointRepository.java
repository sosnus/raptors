package pl.raptors.raptorsRobotsApp.repository.movement;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.movement.Corridor;
import pl.raptors.raptorsRobotsApp.domain.movement.CorridorPoint;

import java.util.List;

@Repository
public interface CorridorPointRepository extends MongoRepository<CorridorPoint, String> {
    List<CorridorPoint> findAllByCorridorId(String corridorId);
}

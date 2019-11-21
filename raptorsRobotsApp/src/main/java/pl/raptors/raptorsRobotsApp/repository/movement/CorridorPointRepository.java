package pl.raptors.raptorsRobotsApp.repository.movement;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.movement.CorridorPoint;

@Repository
public interface CorridorPointRepository extends MongoRepository<CorridorPoint, String> {
}

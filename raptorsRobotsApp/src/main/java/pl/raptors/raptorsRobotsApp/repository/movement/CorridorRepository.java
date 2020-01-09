package pl.raptors.raptorsRobotsApp.repository.movement;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.movement.Corridor;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementPath;

import java.util.List;

@Repository
public interface CorridorRepository extends MongoRepository<Corridor, String> {
    List<Corridor> findAllByMovementPath(MovementPath movementPath);
}

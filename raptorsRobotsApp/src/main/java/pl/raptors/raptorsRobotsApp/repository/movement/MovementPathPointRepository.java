package pl.raptors.raptorsRobotsApp.repository.movement;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementPathPoint;

@Repository
public interface MovementPathPointRepository extends MongoRepository<MovementPathPoint, String>
{
}

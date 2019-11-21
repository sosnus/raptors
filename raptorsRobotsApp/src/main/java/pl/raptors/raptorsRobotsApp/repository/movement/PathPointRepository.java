package pl.raptors.raptorsRobotsApp.repository.movement;
import pl.raptors.raptorsRobotsApp.domain.movement.PathPoint;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PathPointRepository extends MongoRepository<PathPoint, String>
{
}

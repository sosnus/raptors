package pl.raptors.ra_back.repository.movement;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.movement.MovementPath;

@Repository
public interface MovementPathRepository extends MongoRepository<MovementPath, String> {
}

package pl.raptors.ra_back.repository.movement;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.movement.Corridor;

import java.util.List;

@Repository
public interface CorridorRepository extends MongoRepository<Corridor, String> {
    List<Corridor> findAllByMovementPathId(String movementPathId);
}

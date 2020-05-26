package pl.raptors.ra_back.repository.movement;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.movement.MovementMap;

@Repository
public interface MovementMapRepository extends MongoRepository<MovementMap, String> {
}

package pl.raptors.ra_back.repository.movement;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.movement.Route;
import java.util.List;

@Repository
public interface RouteRepository extends MongoRepository<Route, String> {

    List<Route> findAllByMapId(String mapId);

    List<Route> findAllByMovementPathId(String pathId);

    List<Route> findAllByCorridorId(String corridorId);

    List<Route> findAllByPriorityId(String priorityId);
}

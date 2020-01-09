package pl.raptors.raptorsRobotsApp.repository.movement;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.movement.Corridor;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementMap;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementPath;
import pl.raptors.raptorsRobotsApp.domain.movement.Route;
import pl.raptors.raptorsRobotsApp.domain.type.RoutePriority;

import java.util.List;

@Repository
public interface RouteRepository extends MongoRepository<Route, String> {

    List<Route> findAllByMap(MovementMap map);

    List<Route> findAllByPath(MovementPath path);

    List<Route> findAllByCorridor(Corridor corridor);

    List<Route> findAllByPriority(RoutePriority priority);
}

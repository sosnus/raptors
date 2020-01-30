package pl.raptors.raptorsRobotsApp.service.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.Corridor;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementMap;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementPath;
import pl.raptors.raptorsRobotsApp.domain.movement.Route;
import pl.raptors.raptorsRobotsApp.domain.type.RoutePriority;
import pl.raptors.raptorsRobotsApp.repository.movement.RouteRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;
@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
@Service
public class RouteService implements CRUDService<Route> {

    @Autowired
    RouteRepository routeRepository;

    @Override
    public Route addOne(Route route) {
        return routeRepository.save(route);
    }

    @Override
    public Route getOne(String id) {
        return routeRepository.findById(id).orElse(null);
    }

    @Override
    public List<Route> getAll() {
        return routeRepository.findAll();
    }

    @Override
    public Route updateOne(Route route) {
        return routeRepository.save(route);
    }

    @Override
    public void deleteOne(Route route) {
        routeRepository.delete(route);
    }

    List<Route> getByMap(MovementMap map) {
        return routeRepository.findAllByMapId(map.getId());
    }

    List<Route> getByPath(MovementPath path) {
        return routeRepository.findAllByMovementPathId(path.getId());
    }

    List<Route> getByCorridor(Corridor corridor) {
        return routeRepository.findAllByCorridorId(corridor.getId());
    }

    public List<Route> getByPriority(RoutePriority priority) {
        return routeRepository.findAllByPriorityId(priority.getId());
    }
}

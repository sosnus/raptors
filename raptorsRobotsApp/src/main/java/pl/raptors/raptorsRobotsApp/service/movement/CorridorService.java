package pl.raptors.raptorsRobotsApp.service.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.Corridor;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementPath;
import pl.raptors.raptorsRobotsApp.domain.movement.Route;
import pl.raptors.raptorsRobotsApp.repository.movement.CorridorRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;


@Service
public class CorridorService implements CRUDService<Corridor> {

    @Autowired
    CorridorRepository corridorRepository;
    @Autowired
    RouteService routeService;

    @Override
    public Corridor addOne(Corridor corridor) {
        return corridorRepository.save(corridor);
    }

    @Override
    public Corridor getOne(String id) {
        return corridorRepository.findById(id).orElse(null);
    }

    @Override
    public List<Corridor> getAll() {
        return corridorRepository.findAll();
    }

    @Override
    public Corridor updateOne(Corridor corridor) {
        List<Route> routeList = routeService.getByCorridor(this.getOne(corridor.getId()));
        for (Route route : routeList) {
            route.setCorridorId(corridor.getId());
            routeService.updateOne(route);
        }
        return corridorRepository.save(corridor);
    }

    @Override
    public void deleteOne(Corridor corridor) {
        List<Route> routeList = routeService.getByCorridor(this.getOne(corridor.getId()));
        for (Route route : routeList) {
            routeService.deleteOne(route);
        }
        corridorRepository.delete(corridor);
    }

    @Override
    public void deleteAll(List<Corridor> corridorList) {
        for (Corridor corridor : corridorList) {
            this.deleteOne(corridor);
        }
    }

    public void deleteById(String id) {
        Corridor corridor = getOne(id);
        if (corridor != null) {
            List<Route> routeList = routeService.getByCorridor(corridor);
            for (Route route : routeList) {
                routeService.deleteOne(route);
            }
        }
        corridorRepository.deleteById(id);
    }

    List<Corridor> getCorridorsByMovementPath(MovementPath movementPath) {
        return corridorRepository.findAllByMovementPathId(movementPath.getId());
    }

    List<Corridor> getCorridorsByMovementPathId(String movementPathId) {
        return corridorRepository.findAllByMovementPathId(movementPathId);
    }
}

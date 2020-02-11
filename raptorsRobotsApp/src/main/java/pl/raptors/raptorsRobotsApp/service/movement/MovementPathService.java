package pl.raptors.raptorsRobotsApp.service.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.Corridor;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementPath;
import pl.raptors.raptorsRobotsApp.domain.movement.Route;
import pl.raptors.raptorsRobotsApp.repository.movement.MovementPathRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;


@Service
public class MovementPathService implements CRUDService<MovementPath> {

    @Autowired
    MovementPathRepository movementPathRepository;
    @Autowired
    CorridorService corridorService;
    @Autowired
    RouteService routeService;

    @Override
    public MovementPath addOne(MovementPath movementPath) {
        return movementPathRepository.save(movementPath);
    }

    @Override
    public MovementPath getOne(String id) {
        return movementPathRepository.findById(id).orElse(null);
    }

    @Override
    public List<MovementPath> getAll() {
        return movementPathRepository.findAll();
    }

    @Override
    public MovementPath updateOne(MovementPath movementPath) {
        List<Corridor> corridorList = corridorService.getCorridorsByMovementPath(this.getOne(movementPath.getId()));
        List<Route> routeList = routeService.getByPath(this.getOne(movementPath.getId()));
        for (Corridor corridor : corridorList) {
            corridor.setMovementPathId(movementPath.getId());
            corridorService.updateOne(corridor);
        }

        for (Route route : routeList) {
            route.setMovementPathId(movementPath.getId());
            routeService.updateOne(route);
        }
        return movementPathRepository.save(movementPath);
    }

    @Override
    public void deleteOne(MovementPath movementPath) {
        movementPathRepository.delete(movementPath);
        List<Corridor> corridorList = corridorService.getCorridorsByMovementPath(this.getOne(movementPath.getId()));
        setNullCorridorMovementPathId(corridorList);
    }

    @Override
    public void deleteAll(List<MovementPath> movementPathList) {
        for (MovementPath movementPath : movementPathList) {
            this.deleteOne(movementPath);
        }
    }

    public void deleteById(String id) {
        movementPathRepository.deleteById(id);
        List<Corridor> corridorList = corridorService.getCorridorsByMovementPathId(id);
        setNullCorridorMovementPathId(corridorList);
    }

    private void setNullCorridorMovementPathId(List<Corridor> corridorList){
        for (Corridor corridor : corridorList) {
            corridor.setMovementPathId(null);
            corridorService.updateOne(corridor);
        }
    }
}

package pl.raptors.raptorsRobotsApp.service.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.Route;
import pl.raptors.raptorsRobotsApp.repository.movement.RouteRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

@Service
public class RouteService implements CRUDService<Route> {

    @Autowired
    RouteRepository repository;

    @Override
    public Route addOne(Route route) {
        return repository.save(route);
    }

    @Override
    public Route getOne(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Route> getAll() {
        return repository.findAll();
    }

    @Override
    public Route updateOne(Route route) {
        return repository.save(route);
    }

    @Override
    public void deleteOne(Route route) {
        repository.delete(route);
    }
}

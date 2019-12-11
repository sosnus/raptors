package pl.raptors.raptorsRobotsApp.service.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementPath;
import pl.raptors.raptorsRobotsApp.repository.movement.MovementPathRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

@Service
public class MovementPathService implements CRUDService<MovementPath> {

    @Autowired
    MovementPathRepository repository;

    @Override
    public MovementPath addOne(MovementPath movementPath) {
        return repository.save(movementPath);
    }

    @Override
    public MovementPath getOne(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<MovementPath> getAll() {
        return repository.findAll();
    }

    @Override
    public MovementPath updateOne(MovementPath movementPath) {
        return repository.save(movementPath);
    }

    @Override
    public void deleteOne(MovementPath movementPath) {
        repository.delete(movementPath);
    }
}

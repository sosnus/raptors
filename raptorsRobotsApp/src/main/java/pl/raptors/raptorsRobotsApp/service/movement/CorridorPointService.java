package pl.raptors.raptorsRobotsApp.service.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.CorridorPoint;
import pl.raptors.raptorsRobotsApp.repository.movement.CorridorPointRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

@Service
public class CorridorPointService implements CRUDService<CorridorPoint> {

    @Autowired
    CorridorPointRepository repository;

    @Override
    public CorridorPoint addOne(CorridorPoint corridorPoint) {
        return repository.save(corridorPoint);
    }

    @Override
    public CorridorPoint getOne(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<CorridorPoint> getAll() {
        return repository.findAll();
    }

    @Override
    public CorridorPoint updateOne(CorridorPoint corridorPoint) {
        return repository.save(corridorPoint);
    }

    @Override
    public void deleteOne(CorridorPoint corridorPoint) {
        repository.delete(corridorPoint);
    }
}

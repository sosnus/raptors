package pl.raptors.raptorsRobotsApp.service.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.PathPoint;
import pl.raptors.raptorsRobotsApp.repository.movement.PathPointRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

@Service
public class PathPointService implements CRUDService<PathPoint> {

    @Autowired
    PathPointRepository repository;

    @Override
    public PathPoint addOne(PathPoint pathPoint) {
        return repository.save(pathPoint);
    }

    @Override
    public PathPoint getOne(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<PathPoint> getAll() {
        return repository.findAll();
    }

    @Override
    public PathPoint updateOne(PathPoint pathPoint) {
        return repository.save(pathPoint);
    }

    @Override
    public void deleteOne(PathPoint pathPoint) {
        repository.delete(pathPoint);
    }
}

package pl.raptors.raptorsRobotsApp.service.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.Corridor;
import pl.raptors.raptorsRobotsApp.domain.movement.CorridorPoint;
import pl.raptors.raptorsRobotsApp.repository.movement.CorridorPointRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@Service
public class CorridorPointService implements CRUDService<CorridorPoint> {

    @Autowired
    CorridorPointRepository corridorPointRepository;

    @Override
    public CorridorPoint addOne(CorridorPoint corridorPoint) {
        return corridorPointRepository.save(corridorPoint);
    }

    @Override
    public CorridorPoint getOne(String id) {
        return corridorPointRepository.findById(id).orElse(null);
    }

    @Override
    public List<CorridorPoint> getAll() {
        return corridorPointRepository.findAll();
    }

    @Override
    public CorridorPoint updateOne(CorridorPoint corridorPoint) {
        return corridorPointRepository.save(corridorPoint);
    }

    @Override
    public void deleteOne(CorridorPoint corridorPoint) {
        corridorPointRepository.delete(corridorPoint);
    }

    List<CorridorPoint> getCorridorPtsByCorridor(Corridor corridor) {
        return corridorPointRepository.findAllByCorridor(corridor);
    }
}
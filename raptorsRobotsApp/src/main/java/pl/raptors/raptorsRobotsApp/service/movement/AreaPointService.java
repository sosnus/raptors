package pl.raptors.raptorsRobotsApp.service.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.AreaPoint;
import pl.raptors.raptorsRobotsApp.repository.movement.AreaPointRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

@Service
public class AreaPointService implements CRUDService<AreaPoint> {

    @Autowired
    AreaPointRepository repository;

    @Override
    public AreaPoint addOne(AreaPoint areaPoint) {
        return repository.save(areaPoint);
    }

    @Override
    public AreaPoint getOne(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<AreaPoint> getAll() {
        return repository.findAll();
    }

    @Override
    public AreaPoint updateOne(AreaPoint areaPoint) {
        return repository.save(areaPoint);
    }

    @Override
    public void deleteOne(AreaPoint areaPoint) {
        repository.delete(areaPoint);
    }
}

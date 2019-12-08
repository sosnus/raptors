package pl.raptors.raptorsRobotsApp.service.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.MapArea;
import pl.raptors.raptorsRobotsApp.repository.movement.MapAreaRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

@Service
public class MapAreaService implements CRUDService<MapArea> {
    @Autowired
    MapAreaRepository repository;

    @Override
    public MapArea addOne(MapArea mapArea) {
        return repository.save(mapArea);
    }

    @Override
    public MapArea getOne(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<MapArea> getAll() {
        return repository.findAll();
    }

    @Override
    public MapArea updateOne(MapArea mapArea) {
        return repository.save(mapArea);
    }

    @Override
    public void deleteOne(MapArea mapArea) {
        repository.delete(mapArea);
    }
}

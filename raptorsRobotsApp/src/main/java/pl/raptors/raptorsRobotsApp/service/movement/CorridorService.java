package pl.raptors.raptorsRobotsApp.service.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.Corridor;
import pl.raptors.raptorsRobotsApp.repository.movement.CorridorRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

@Service
public class CorridorService implements CRUDService<Corridor> {

    @Autowired
    CorridorRepository repository;

    @Override
    public Corridor addOne(Corridor corridor) {
        return repository.save(corridor);
    }

    @Override
    public Corridor getOne(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Corridor> getAll() {
        return repository.findAll();
    }

    @Override
    public Corridor updateOne(Corridor corridor) {
        return repository.save(corridor);
    }

    @Override
    public void deleteOne(Corridor corridor) {
        repository.delete(corridor);
    }
}

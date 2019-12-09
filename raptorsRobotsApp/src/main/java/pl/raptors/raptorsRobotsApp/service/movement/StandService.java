package pl.raptors.raptorsRobotsApp.service.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.Stand;
import pl.raptors.raptorsRobotsApp.repository.movement.StandRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

@Service
public class StandService implements CRUDService<Stand> {

    @Autowired
    StandRepository repository;

    @Override
    public Stand addOne(Stand stand) {
        return repository.save(stand);
    }

    @Override
    public Stand getOne(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Stand> getAll() {
        return repository.findAll();
    }

    @Override
    public Stand updateOne(Stand stand) {
        return repository.save(stand);
    }

    @Override
    public void deleteOne(Stand stand) {
        repository.delete(stand);
    }
}

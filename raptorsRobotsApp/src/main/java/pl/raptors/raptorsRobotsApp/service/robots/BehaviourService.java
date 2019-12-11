package pl.raptors.raptorsRobotsApp.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.robots.Behaviour;
import pl.raptors.raptorsRobotsApp.repository.robots.BehaviourRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

@Service
public class BehaviourService implements CRUDService<Behaviour> {

    @Autowired
    BehaviourRepository behaviourRepository;

    @Override
    public Behaviour addOne(Behaviour behaviour) {
        return behaviourRepository.save(behaviour);
    }

    @Override
    public Behaviour getOne(String id) {
        return behaviourRepository.findById(id).orElse(null);
    }

    @Override
    public List<Behaviour> getAll() {
        return behaviourRepository.findAll();
    }

    @Override
    public Behaviour updateOne(Behaviour behaviour) {
        return behaviourRepository.save(behaviour);
    }

    @Override
    public void deleteOne(Behaviour behaviour) {
        behaviourRepository.delete(behaviour);
    }
}

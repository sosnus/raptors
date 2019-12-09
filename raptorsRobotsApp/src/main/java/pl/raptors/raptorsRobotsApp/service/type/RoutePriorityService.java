package pl.raptors.raptorsRobotsApp.service.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.type.RoutePriority;
import pl.raptors.raptorsRobotsApp.repository.type.RoutePriorityRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;
import java.util.Objects;

@Service
public class RoutePriorityService implements CRUDService<RoutePriority> {

    @Autowired
    RoutePriorityRepository routePriorityRepository;

    @Override
    public RoutePriority addOne(RoutePriority RoutePriority) {
        RoutePriority routePriorityAlreadyExists = routePriorityRepository.findByName(RoutePriority.getName());
        if (Objects.isNull((routePriorityAlreadyExists))) {
            routePriorityRepository.save(RoutePriority);
            return RoutePriority;
        }
        return routePriorityAlreadyExists;
    }

    @Override
    public RoutePriority getOne(String id) {
        return routePriorityRepository.findById(id).orElse(null);
    }

    @Override
    public List<RoutePriority> getAll() {
        return routePriorityRepository.findAll();
    }

    @Override
    public RoutePriority updateOne(RoutePriority RoutePriority) {
        return routePriorityRepository.save(RoutePriority);
    }

    @Override
    public void deleteOne(RoutePriority RoutePriority) {
        RoutePriority RoutePriorityToDelete = routePriorityRepository.findByName(RoutePriority.getName());
        if (!Objects.isNull((RoutePriorityToDelete))) {
            routePriorityRepository.delete(RoutePriorityToDelete);
        }
    }
}

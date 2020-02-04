package pl.raptors.raptorsRobotsApp.service.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.Route;
import pl.raptors.raptorsRobotsApp.domain.type.RoutePriority;
import pl.raptors.raptorsRobotsApp.repository.type.RoutePriorityRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;
import pl.raptors.raptorsRobotsApp.service.movement.RouteService;

import java.util.List;
import java.util.Objects;

@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_SERVICEMAN')")
@Service
public class RoutePriorityService implements CRUDService<RoutePriority> {

    @Autowired
    RoutePriorityRepository routePriorityRepository;
    @Autowired
    RouteService routeService;

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
    public RoutePriority updateOne(RoutePriority routePriority) {
        List<Route> routeList = routeService.getByPriority(this.getOne(routePriority.getId()));
        for (Route route : routeList) {
            route.setPriorityId(routePriority.getId());
            routeService.updateOne(route);
        }
        return routePriorityRepository.save(routePriority);
    }

    @Override
    public void deleteOne(RoutePriority routePriority) {
        RoutePriority RoutePriorityToDelete = routePriorityRepository.findByName(routePriority.getName());
        if (!Objects.isNull((RoutePriorityToDelete))) {
            List<Route> routeList = routeService.getByPriority(this.getOne(routePriority.getId()));
            routeService.deleteAll(routeList);
            routePriorityRepository.delete(RoutePriorityToDelete);
        }
    }

    @Override
    public void deleteAll(List<RoutePriority> routePriorityList) {
        for (RoutePriority routePriority : routePriorityList) {
            this.deleteOne(routePriority);
        }
    }
}

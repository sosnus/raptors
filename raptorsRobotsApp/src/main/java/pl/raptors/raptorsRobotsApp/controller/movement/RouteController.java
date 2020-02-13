package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.movement.Route;
import pl.raptors.raptorsRobotsApp.domain.type.RoutePriority;
import pl.raptors.raptorsRobotsApp.service.movement.RouteService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/movement/routes")
public class RouteController {
    @Autowired
    RouteService routeService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<Route> getAll() {
        return routeService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/add")
    public Route add(@RequestBody @Valid Route route) {
        if (route.getId() != null) {
            return routeService.updateOne(route);
        } else {
            return routeService.addOne(route);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/update")
    public Route update(@RequestBody @Valid Route route) {
        return routeService.updateOne(route);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public Route getOne(@PathVariable String id) {
        return routeService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Route route) {
        routeService.deleteOne(route);
    }
}

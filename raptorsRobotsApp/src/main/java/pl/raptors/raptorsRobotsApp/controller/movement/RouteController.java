package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.movement.Route;
import pl.raptors.raptorsRobotsApp.domain.type.RoutePriority;
import pl.raptors.raptorsRobotsApp.service.movement.RouteService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/movement/routes")
public class RouteController {
    @Autowired
    RouteService routeService;

    @GetMapping("/all")
    public List<Route> getAll() {
        return routeService.getAll();
    }

    @PostMapping("/add")
    public Route add(@RequestBody @Valid Route route) {
        return routeService.addOne(route);
    }

    @PostMapping("/update")
    public Route update(@RequestBody @Valid Route route) {
        return routeService.updateOne(route);
    }

    @GetMapping("/{id}")
    public Route getOne(@PathVariable String id) {
        return routeService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Route route) {
        routeService.deleteOne(route);
    }
}

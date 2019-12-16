package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementPathPoint;
import pl.raptors.raptorsRobotsApp.service.movement.MovementPathPointService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/movement/movement-paths-points")
public class MovementPathPointController {
    @Autowired
    MovementPathPointService service;

    @GetMapping("/all")
    public List<MovementPathPoint> getAll() {
        return service.getAll();
    }

    @PostMapping("/add")
    public MovementPathPoint add(@RequestBody @Valid MovementPathPoint movementPathPoint) {
        return service.addOne(movementPathPoint);
    }

    @GetMapping("/{id}")
    public MovementPathPoint getOne(@PathVariable String id) {
        return service.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid MovementPathPoint movementPathPoint) {
        service.deleteOne(movementPathPoint);
    }
}

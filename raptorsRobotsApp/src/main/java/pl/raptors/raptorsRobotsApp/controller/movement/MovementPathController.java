package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementPath;
import pl.raptors.raptorsRobotsApp.service.movement.MovementPathService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/movement/movement-paths")
public class MovementPathController {
    @Autowired
    MovementPathService movementPathService;

    @GetMapping("/all")
    public List<MovementPath> getAll() {
        return movementPathService.getAll();
    }

    @PostMapping("/add")
    public MovementPath add(@RequestBody @Valid MovementPath movementPath) {
        if (movementPath.getId() != null) {
            return movementPathService.updateOne(movementPath);
        } else {
            return movementPathService.addOne(movementPath);
        }
    }

    @PostMapping("/update")
    public MovementPath update(@RequestBody @Valid MovementPath movementPath) {
        return movementPathService.updateOne(movementPath);
    }

    @GetMapping("/{id}")
    public MovementPath getOne(@PathVariable String id) {
        return movementPathService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid MovementPath movementPath) {
        movementPathService.deleteOne(movementPath);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable String id) {
        movementPathService.deleteById(id);
    }
}

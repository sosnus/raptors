package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementPath;
import pl.raptors.raptorsRobotsApp.service.movement.MovementPathService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/movement/movement-paths")
public class MovementPathController {
    @Autowired
    MovementPathService movementPathService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<MovementPath> getAll() {
        return movementPathService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/add")
    public MovementPath add(@RequestBody @Valid MovementPath movementPath) {
        if (movementPath.getId() != null) {
            return movementPathService.updateOne(movementPath);
        } else {
            return movementPathService.addOne(movementPath);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/update")
    public MovementPath update(@RequestBody @Valid MovementPath movementPath) {
        return movementPathService.updateOne(movementPath);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public MovementPath getOne(@PathVariable String id) {
        return movementPathService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid MovementPath movementPath) {
        movementPathService.deleteOne(movementPath);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable String id) {
        movementPathService.deleteById(id);
    }
}

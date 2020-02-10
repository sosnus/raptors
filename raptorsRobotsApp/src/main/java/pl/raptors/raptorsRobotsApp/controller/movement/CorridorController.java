package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.movement.Corridor;
import pl.raptors.raptorsRobotsApp.service.movement.CorridorService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/movement/corridors")
public class CorridorController {
    @Autowired
    CorridorService corridorService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<Corridor> getAll() {
        return corridorService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/add")
    public Corridor add(@RequestBody @Valid Corridor corridor) {
        if (corridor.getId() != null) {
            return corridorService.updateOne(corridor);
        } else {
            return corridorService.addOne(corridor);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/update")
    public Corridor update(@RequestBody @Valid Corridor corridor) {
        return corridorService.updateOne(corridor);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public Corridor getOne(@PathVariable String id) {
        return corridorService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Corridor corridor) {
        corridorService.deleteOne(corridor);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable String id) {
        corridorService.deleteById(id);
    }
}

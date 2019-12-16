package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.movement.Corridor;
import pl.raptors.raptorsRobotsApp.service.movement.CorridorService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/movement/corridors")
public class CorridorController {
    @Autowired
    CorridorService service;

    @GetMapping("/all")
    public List<Corridor> getAll() {
        return service.getAll();
    }

    @PostMapping("/add")
    public Corridor add(@RequestBody @Valid Corridor corridor) {
        return service.addOne(corridor);
    }

    @GetMapping("/{id}")
    public Corridor getOne(@PathVariable String id) {
        return service.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Corridor corridor) {
        service.deleteOne(corridor);
    }
}

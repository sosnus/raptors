package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.movement.CorridorPoint;
import pl.raptors.raptorsRobotsApp.service.movement.CorridorPointService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/movement/corridor-points")
public class CorridorPointController {
    @Autowired
    CorridorPointService service;

    @GetMapping("/all")
    public List<CorridorPoint> getAll() {
        return service.getAll();
    }

    @PostMapping("/add")
    public CorridorPoint add(@RequestBody @Valid CorridorPoint corridorPoint) {
        return service.addOne(corridorPoint);
    }

    @GetMapping("/{id}")
    public CorridorPoint getOne(@PathVariable String id) {
        return service.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid CorridorPoint areaPoint) {
        service.deleteOne(areaPoint);
    }
}

package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.movement.PathPoint;
import pl.raptors.raptorsRobotsApp.service.movement.PathPointService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/movement/path-points")
public class PathPointController {
    @Autowired
    PathPointService service;

    @GetMapping("/all")
    public List<PathPoint> getAll() {
        return service.getAll();
    }

    @PostMapping("/add")
    public PathPoint add(@RequestBody @Valid PathPoint pathPoint) {
        return service.addOne(pathPoint);
    }

    @GetMapping("/{id}")
    public PathPoint getOne(@PathVariable String id) {
        return service.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid PathPoint pathPoint) {
        service.deleteOne(pathPoint);
    }
}

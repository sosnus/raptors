package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.movement.AreaPoint;
import pl.raptors.raptorsRobotsApp.service.movement.AreaPointService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/movement/area-points")
public class AreaPointController {

    @Autowired
    AreaPointService service;

    @GetMapping("/all")
    public List<AreaPoint> getAll() {
        return service.getAll();
    }

    @PostMapping("/add")
    public AreaPoint add(@RequestBody @Valid AreaPoint areaPoint) {
        return service.addOne(areaPoint);
    }

    @GetMapping("/{id}")
    public AreaPoint getOne(@PathVariable String id) {
        return service.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid AreaPoint areaPoint) {
        service.deleteOne(areaPoint);
    }
}

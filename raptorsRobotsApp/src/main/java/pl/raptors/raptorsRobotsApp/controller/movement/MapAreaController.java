package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.movement.MapArea;
import pl.raptors.raptorsRobotsApp.service.movement.MapAreaService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/movement/map-areas")
public class MapAreaController {
    @Autowired
    MapAreaService service;

    @GetMapping("/all")
    public List<MapArea> getAll() {
        return service.getAll();
    }

    @PostMapping("/add")
    public MapArea add(@RequestBody @Valid MapArea mapArea) {
        return service.addOne(mapArea);
    }

    @GetMapping("/{id}")
    public MapArea getOne(@PathVariable String id) {
        return service.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid MapArea mapArea) {
        service.deleteOne(mapArea);
    }
}

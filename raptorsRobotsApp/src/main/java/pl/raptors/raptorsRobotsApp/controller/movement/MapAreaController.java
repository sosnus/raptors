package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.movement.MapArea;
import pl.raptors.raptorsRobotsApp.service.movement.MapAreaService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/movement/map-areas")
public class MapAreaController {
    @Autowired
    MapAreaService mapAreaService;

    @GetMapping("/all")
    public List<MapArea> getAll() {
        return mapAreaService.getAll();
    }

    @PostMapping("/add")
    public MapArea add(@RequestBody @Valid MapArea mapArea) {
        return mapAreaService.addOne(mapArea);
    }

    @PostMapping("/update")
    public MapArea update(@RequestBody @Valid MapArea mapArea) {
        return mapAreaService.updateOne(mapArea);
    }

    @GetMapping("/{id}")
    public MapArea getOne(@PathVariable String id) {
        return mapAreaService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid MapArea mapArea) { mapAreaService.deleteOne(mapArea); }
}

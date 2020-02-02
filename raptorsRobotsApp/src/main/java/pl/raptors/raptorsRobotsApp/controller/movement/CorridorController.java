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
    CorridorService corridorService;

    @GetMapping("/all")
    public List<Corridor> getAll() {
        return corridorService.getAll();
    }

    @PostMapping("/add")
    public Corridor add(@RequestBody @Valid Corridor corridor) {
        if (corridor.getId() != null) {
            return corridorService.updateOne(corridor);
        } else {
            return corridorService.addOne(corridor);
        }
    }

    @PostMapping("/update")
    public Corridor update(@RequestBody @Valid Corridor corridor) {
        return corridorService.updateOne(corridor);
    }

    @GetMapping("/{id}")
    public Corridor getOne(@PathVariable String id) {
        return corridorService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Corridor corridor) {
        corridorService.deleteOne(corridor);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable String id) {
        corridorService.deleteById(id);
    }
}

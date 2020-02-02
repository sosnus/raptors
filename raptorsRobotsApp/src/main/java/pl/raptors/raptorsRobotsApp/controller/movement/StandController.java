package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.movement.Stand;
import pl.raptors.raptorsRobotsApp.service.movement.StandService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/movement/stands")
public class StandController {
    @Autowired
    StandService standService;

    @GetMapping("/all")
    public List<Stand> getAll() {
        return standService.getAll();
    }

    @PostMapping("/add")
    public Stand add(@RequestBody @Valid Stand stand) {
        if (stand.getId() != null) {
            return standService.updateOne(stand);
        } else {
            return standService.addOne(stand);
        }
    }

    @PostMapping("/update")
    public Stand update(@RequestBody @Valid Stand stand) {
        return standService.updateOne(stand);
    }

    @GetMapping("/{id}")
    public Stand getOne(@PathVariable String id) {
        return standService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Stand stand) {
        standService.deleteOne(stand);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteByID(@PathVariable String id) {
        standService.deleteByID(id);
    }
}

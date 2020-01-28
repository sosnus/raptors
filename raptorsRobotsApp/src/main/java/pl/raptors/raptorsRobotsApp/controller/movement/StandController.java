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
    StandService service;

    @GetMapping("/all")
    public List<Stand> getAll() {
        return service.getAll();
    }

    @PostMapping("/add")
    public Stand add(@RequestBody @Valid Stand stand) {
        return service.addOne(stand);
    }

    @GetMapping("/{id}")
    public Stand getOne(@PathVariable String id) {
        return service.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Stand stand) {
        service.deleteOne(stand);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteByID(@PathVariable String id) {
        service.deleteByID(id);
    }
}

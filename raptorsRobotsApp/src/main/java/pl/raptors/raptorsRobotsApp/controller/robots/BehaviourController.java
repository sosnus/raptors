package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.Behaviour;
import pl.raptors.raptorsRobotsApp.service.robots.BehaviourService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/robots/behaviours")
public class BehaviourController {

    @Autowired
    BehaviourService behaviourService;

    @GetMapping("/all")
    public List<Behaviour> getAll() {
        return behaviourService.getAll();
    }

    @PostMapping("/add")
    public Behaviour add(@RequestBody @Valid Behaviour behaviour) {
        return behaviourService.addOne(behaviour);
    }

    @GetMapping("/{id}")
    public Behaviour getOne(@PathVariable String id) {
        return behaviourService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Behaviour behaviour) {
        behaviourService.deleteOne(behaviour);
    }
}

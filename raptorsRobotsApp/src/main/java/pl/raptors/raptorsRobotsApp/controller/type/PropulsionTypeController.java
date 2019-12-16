package pl.raptors.raptorsRobotsApp.controller.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.type.PropulsionType;
import pl.raptors.raptorsRobotsApp.service.type.PropulsionTypeService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/type/propulsion-types")
public class PropulsionTypeController {
    @Autowired
    PropulsionTypeService propulsionTypeService;

    @GetMapping("/all")
    public List<PropulsionType> getAll() {
        return propulsionTypeService.getAll();
    }

    @PostMapping("/add")
    public PropulsionType add(@RequestBody @Valid PropulsionType propulsionType) {
        return propulsionTypeService.addOne(propulsionType);
    }

    @GetMapping("/{id}")
    public PropulsionType getOne(@PathVariable String id) {
        return propulsionTypeService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid PropulsionType propulsionType) {
        propulsionTypeService.deleteOne(propulsionType);
    }
}

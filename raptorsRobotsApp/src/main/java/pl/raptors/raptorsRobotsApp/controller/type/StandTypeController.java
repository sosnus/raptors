package pl.raptors.raptorsRobotsApp.controller.type;

import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.type.StandType;
import pl.raptors.raptorsRobotsApp.service.type.StandTypeService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/type/stand-types")
public class StandTypeController {

    private StandTypeService service;

    public StandTypeController(StandTypeService service) {
        this.service = service;
    }

    @GetMapping("/all")
    public List<StandType> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public StandType getOne(@PathVariable String id){
        return service.getOne(id);
    }

    @PostMapping("/add")
    public StandType add(@RequestBody @Valid StandType standType) {
        return service.addOne(standType);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid StandType standType) {
        service.deleteOne(standType);
    }

}

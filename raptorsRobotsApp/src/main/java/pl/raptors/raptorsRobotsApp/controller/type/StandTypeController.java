package pl.raptors.raptorsRobotsApp.controller.type;

import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.type.StandType;
import pl.raptors.raptorsRobotsApp.repository.type.StandTypeRepository;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/types/stand-types")
public class StandTypeController {

    private StandTypeRepository repository;

    public StandTypeController(StandTypeRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/all")
    public List<StandType> getAll(){
        return this.repository.findAll();
    }

    @PostMapping("/add")
    public StandType add(@RequestBody @Valid StandType standType){
        return this.repository.save(standType);
    }


}

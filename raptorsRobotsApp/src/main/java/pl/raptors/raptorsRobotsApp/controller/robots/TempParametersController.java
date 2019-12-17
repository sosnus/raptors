package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.TempParameters;
import pl.raptors.raptorsRobotsApp.service.robots.TempParametersService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/robots/temp-parameters")
public class TempParametersController {

    @Autowired
    TempParametersService tempParametersService;

    @GetMapping("/all")
    public List<TempParameters> getAll() {
        return tempParametersService.getAll();
    }

    @PostMapping("/add")
    public TempParameters add(@RequestBody @Valid TempParameters tempParameters) {
        return tempParametersService.addOne(tempParameters);
    }

    @GetMapping("/{id}")
    public TempParameters getOne(@PathVariable String id) {
        return tempParametersService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid TempParameters tempParameters) {
        tempParametersService.deleteOne(tempParameters);
    }
}

package pl.raptors.raptorsRobotsApp.controller.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.type.AreaType;
import pl.raptors.raptorsRobotsApp.service.type.AreaTypeService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/type/area-types")
public class AreaTypeController {
    @Autowired
    AreaTypeService areaTypeService;

    @GetMapping("/all")
    public List<AreaType> getAll() {
        return areaTypeService.getAll();
    }

    @PostMapping("/add")
    public AreaType add(@RequestBody @Valid AreaType areaType) {
        return areaTypeService.addOne(areaType);
    }

    @GetMapping("/{id}")
    public AreaType getOne(@PathVariable String id) {
        return areaTypeService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid AreaType areaType) {
        areaTypeService.deleteOne(areaType);
    }
}

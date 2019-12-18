package pl.raptors.raptorsRobotsApp.controller.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.type.ParkingType;
import pl.raptors.raptorsRobotsApp.service.type.ParkingTypeService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/type/parking-types")
public class ParkingTypeController {

    @Autowired
    ParkingTypeService parkingTypeService;
    @GetMapping("/all")
    public List<ParkingType> getAll() {
        return parkingTypeService.getAll();
    }

    @PostMapping("/add")
    public ParkingType add(@RequestBody @Valid ParkingType parkingType) {
        return parkingTypeService.addOne(parkingType);
    }

    @GetMapping("/{id}")
    public ParkingType getOne(@PathVariable String id) {
        return parkingTypeService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid ParkingType parkingType) {
        parkingTypeService.deleteOne(parkingType);
    }
}

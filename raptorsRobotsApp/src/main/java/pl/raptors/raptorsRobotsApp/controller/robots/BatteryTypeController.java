package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.BatteryType;
import pl.raptors.raptorsRobotsApp.service.robots.BatteryTypeService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/robots/battery-types")
public class BatteryTypeController {

    @Autowired
    BatteryTypeService batteryTypeService;

    @GetMapping("/all")
    public List<BatteryType> getAll() {
        return batteryTypeService.getAll();
    }

    @PostMapping("/add")
    public BatteryType add(@RequestBody @Valid BatteryType batteryType) {
        return batteryTypeService.addOne(batteryType);
    }

    @PostMapping("/update")
    public BatteryType update(@RequestBody @Valid BatteryType batteryType) {
        return batteryTypeService.updateOne(batteryType);
    }

    @GetMapping("/{id}")
    public BatteryType getOne(@PathVariable String id) {
        return batteryTypeService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid BatteryType batteryType) {
        batteryTypeService.deleteOne(batteryType);
    }
}

package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotBattery;
import pl.raptors.raptorsRobotsApp.service.robots.RobotBatteryService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/robots/batteries")
public class RobotBatteryController {

    @Autowired
    RobotBatteryService robotBatteryService;

    @GetMapping("/all")
    public List<RobotBattery> getAll() {
        return robotBatteryService.getAll();
    }

    @PostMapping("/add")
    public RobotBattery add(@RequestBody @Valid RobotBattery robotBattery) {
        if (robotBattery.getId() != null) {
            return robotBatteryService.updateOne(robotBattery);
        } else {
            return robotBatteryService.addOne(robotBattery);
        }
    }

    @PostMapping("/update")
    public RobotBattery update(@RequestBody @Valid RobotBattery robotBattery) {
        return robotBatteryService.updateOne(robotBattery);
    }

    @GetMapping("/{id}")
    public RobotBattery getOne(@PathVariable String id) {
        return robotBatteryService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid RobotBattery robotBattery) {
        robotBatteryService.deleteOne(robotBattery);
    }
}

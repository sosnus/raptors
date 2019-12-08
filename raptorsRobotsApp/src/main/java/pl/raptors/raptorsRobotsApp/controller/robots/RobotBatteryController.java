package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotBattery;
import pl.raptors.raptorsRobotsApp.service.robots.RobotBatteryService;

import javax.validation.Valid;
import java.util.List;

@Controller
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
        return robotBatteryService.addOne(robotBattery);
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

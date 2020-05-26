package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotBattery;
import pl.raptors.raptorsRobotsApp.service.robots.RobotBatteryService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/robots/batteries")
public class RobotBatteryController {

    @Autowired
    RobotBatteryService robotBatteryService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<RobotBattery> getAll() {
        return robotBatteryService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/add")
    public RobotBattery add(@RequestBody @Valid RobotBattery robotBattery) {
        if (robotBattery.getId() != null) {
            return robotBatteryService.updateOne(robotBattery);
        } else {
            return robotBatteryService.addOne(robotBattery);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/update")
    public RobotBattery update(@RequestBody @Valid RobotBattery robotBattery) {
        return robotBatteryService.updateOne(robotBattery);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public RobotBattery getOne(@PathVariable String id) {
        return robotBatteryService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid RobotBattery robotBattery) {
        robotBatteryService.deleteOne(robotBattery);
    }
}

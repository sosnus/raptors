package pl.raptors.raptorsRobotsApp.controller.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.type.RobotStatus;
import pl.raptors.raptorsRobotsApp.service.type.RobotStatusService;


import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/type/robot-statuses")
public class RobotStatusController {
    @Autowired
    RobotStatusService robotStatusService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<RobotStatus> getAll() {
        return robotStatusService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/add")
    public RobotStatus add(@RequestBody @Valid RobotStatus robotStatus) {
        if (robotStatus.getId() != null) {
            return robotStatusService.updateOne(robotStatus);
        } else {
            return robotStatusService.addOne(robotStatus);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/update")
    public RobotStatus update(@RequestBody @Valid RobotStatus robotStatus) {
        return robotStatusService.updateOne(robotStatus);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public RobotStatus getOne(@PathVariable String id) {
        return robotStatusService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid RobotStatus robotStatus) {
        robotStatusService.deleteOne(robotStatus);
    }
}

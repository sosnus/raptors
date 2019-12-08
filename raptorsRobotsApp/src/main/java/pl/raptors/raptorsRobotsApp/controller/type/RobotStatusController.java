package pl.raptors.raptorsRobotsApp.controller.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.type.RobotStatus;
import pl.raptors.raptorsRobotsApp.service.type.RobotStatusService;


import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/type/robot-statuses")
public class RobotStatusController {
    @Autowired
    RobotStatusService robotStatusService;

    @GetMapping("/all")
    public List<RobotStatus> getAll() {
        return robotStatusService.getAll();
    }

    @PostMapping("/add")
    public RobotStatus add(@RequestBody @Valid RobotStatus robotStatus) {
        return robotStatusService.addOne(robotStatus);
    }

    @GetMapping("/{id}")
    public RobotStatus getOne(@PathVariable String id) {
        return robotStatusService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid RobotStatus robotStatus) {
        robotStatusService.deleteOne(robotStatus);
    }
}

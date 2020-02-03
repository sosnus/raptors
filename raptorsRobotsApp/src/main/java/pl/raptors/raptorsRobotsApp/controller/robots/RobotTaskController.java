package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotTask;
import pl.raptors.raptorsRobotsApp.service.robots.RobotTaskService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/robots/tasks")
public class RobotTaskController {

    @Autowired
    RobotTaskService robotTaskService;

    @GetMapping("/all")
    public List<RobotTask> getAll() {
        return robotTaskService.getAll();
    }

    @PostMapping("/add")
    public RobotTask add(@RequestBody @Valid RobotTask robotTask) {
        if (robotTask.getId() != null) {
            return robotTaskService.updateOne(robotTask);
        } else {
            return robotTaskService.addOne(robotTask);
        }
    }

    @PostMapping("/update")
    public RobotTask update(@RequestBody @Valid RobotTask robotTask) {
        return robotTaskService.updateOne(robotTask);
    }

    @GetMapping("/{id}")
    public RobotTask getOne(@PathVariable String id) {
        return robotTaskService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid RobotTask robotTask) {
        robotTaskService.deleteOne(robotTask);
    }
}

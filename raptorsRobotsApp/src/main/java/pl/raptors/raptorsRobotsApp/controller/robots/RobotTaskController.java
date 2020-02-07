package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<RobotTask> getAll() {
        return robotTaskService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_REGULAR_USER')")
    @PostMapping("/add")
    public RobotTask add(@RequestBody @Valid RobotTask robotTask) {
        if (robotTask.getId() != null) {
            return robotTaskService.updateOne(robotTask);
        } else {
            return robotTaskService.addOne(robotTask);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_SUPER_USER')")
    @PostMapping("/get-list")
    public List<RobotTask> getTasksListForUsersList(@RequestBody @Valid List<String> usersIDsList) {
        return  robotTaskService.getTasksByUsersIds(usersIDsList);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_REGULAR_USER')")
    @PostMapping("/update")
    public RobotTask update(@RequestBody @Valid RobotTask robotTask) {
        return robotTaskService.updateOne(robotTask);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public RobotTask getOne(@PathVariable String id) {
        return robotTaskService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_REGULAR_USER')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid RobotTask robotTask) {
        robotTaskService.deleteOne(robotTask);
    }
}

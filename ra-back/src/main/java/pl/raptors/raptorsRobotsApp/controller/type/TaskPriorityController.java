package pl.raptors.raptorsRobotsApp.controller.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.type.TaskPriority;
import pl.raptors.raptorsRobotsApp.service.type.TaskPriorityService;


import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/type/task-priorities")
public class TaskPriorityController {

    @Autowired
    TaskPriorityService taskPriorityService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<TaskPriority> getAll() {
        return taskPriorityService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_REGULAR_USER')")
    @PostMapping("/add")
    public TaskPriority add(@RequestBody @Valid TaskPriority taskPriority) {
        if (taskPriority.getId() != null) {
            return taskPriorityService.updateOne(taskPriority);
        } else {
            return taskPriorityService.addOne(taskPriority);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_REGULAR_USER')")
    @PostMapping("/update")
    public TaskPriority update(@RequestBody @Valid TaskPriority taskPriority) {
        return taskPriorityService.updateOne(taskPriority);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public TaskPriority getOne(@PathVariable String id) {
        return taskPriorityService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_REGULAR_USER')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid TaskPriority taskPriority) {
        taskPriorityService.deleteOne(taskPriority);
    }
}

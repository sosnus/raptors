package pl.raptors.raptorsRobotsApp.controller.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.type.TaskPriority;
import pl.raptors.raptorsRobotsApp.service.type.TaskPriorityService;


import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/type/task-priorities")
public class TaskPriorityController {

    @Autowired
    TaskPriorityService taskPriorityService;

    @GetMapping("/all")
    public List<TaskPriority> getAll() {
        return taskPriorityService.getAll();
    }

    @PostMapping("/add")
    public TaskPriority add(@RequestBody @Valid TaskPriority taskPriority) {
        return taskPriorityService.addOne(taskPriority);
    }

    @PostMapping("/update")
    public TaskPriority update(@RequestBody @Valid TaskPriority taskPriority) {
        return taskPriorityService.updateOne(taskPriority);
    }

    @GetMapping("/{id}")
    public TaskPriority getOne(@PathVariable String id) {
        return taskPriorityService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid TaskPriority taskPriority) {
        taskPriorityService.deleteOne(taskPriority);
    }
}

package pl.raptors.ra_back.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.ra_back.domain.tasks.TaskTemplate;
import pl.raptors.ra_back.service.tasks.TaskTemplateService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/tasks/templates")
public class TaskTemplateController {

    @Autowired
    TaskTemplateService taskTemplateService;

    //@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<TaskTemplate> getAll() {
        List<TaskTemplate> taskTemplates = taskTemplateService.getAll();
//        for (TaskTemplate r:taskTemplates      ) {
//            System.out.println(r);
//        }
//        System.out.println(taskTemplates);
        return taskTemplates;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_REGULAR_USER')")
    @PostMapping("/add")
    public TaskTemplate add(@RequestBody @Valid TaskTemplate taskTemplate) {
        if (taskTemplate.getId() != null) {
            return taskTemplateService.updateOne(taskTemplate);
        } else {
            return taskTemplateService.addOne(taskTemplate);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_REGULAR_USER')")
    @PostMapping("/update")
    public TaskTemplate update(@RequestBody @Valid TaskTemplate taskTemplate) {
        return taskTemplateService.updateOne(taskTemplate);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public TaskTemplate getOne(@PathVariable String id) {
        return taskTemplateService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_REGULAR_USER')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid TaskTemplate taskTemplate) {
        taskTemplateService.deleteOne(taskTemplate);
    }

    @GetMapping("/by-kiosk/{id}")
    public List<TaskTemplate> getByKioskId(@PathVariable String id) {
        List<TaskTemplate> taskTemplates = taskTemplateService.getByKioskId(id);
        return taskTemplates;
    }
}

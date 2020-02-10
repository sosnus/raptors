package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotModel;
import pl.raptors.raptorsRobotsApp.service.robots.RobotModelService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/robots/models")
public class RobotModelController {

    @Autowired
    RobotModelService robotModelService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<RobotModel> getAll() {
        return robotModelService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/add")
    public RobotModel add(@RequestBody @Valid RobotModel robotModel) {
        if (robotModel.getId() != null) {
            return robotModelService.updateOne(robotModel);
        } else {
            return robotModelService.addOne(robotModel);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/update")
    public RobotModel update(@RequestBody @Valid RobotModel robotModel) {
        return robotModelService.updateOne(robotModel);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public RobotModel getOne(@PathVariable String id) {
        return robotModelService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid RobotModel robotModel) {
        robotModelService.deleteOne(robotModel);
    }
}

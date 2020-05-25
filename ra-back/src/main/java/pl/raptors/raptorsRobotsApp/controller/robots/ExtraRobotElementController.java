package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.ExtraRobotElement;
import pl.raptors.raptorsRobotsApp.service.robots.ExtraRobotElementService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/robots/extra-elements")
public class ExtraRobotElementController {

    @Autowired
    ExtraRobotElementService extraRobotElementService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<ExtraRobotElement> getAll() {
        return extraRobotElementService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/add")
    public ExtraRobotElement add(@RequestBody @Valid ExtraRobotElement extraRobotElement) {
        if (extraRobotElement.getId() != null) {
            return extraRobotElementService.updateOne(extraRobotElement);
        } else {
            return extraRobotElementService.addOne(extraRobotElement);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/update")
    public ExtraRobotElement update(@RequestBody @Valid ExtraRobotElement extraRobotElement) {
        return extraRobotElementService.updateOne(extraRobotElement);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public ExtraRobotElement getOne(@PathVariable String id) {
        return extraRobotElementService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid ExtraRobotElement extraRobotElement) {
        extraRobotElementService.deleteOne(extraRobotElement);
    }
}

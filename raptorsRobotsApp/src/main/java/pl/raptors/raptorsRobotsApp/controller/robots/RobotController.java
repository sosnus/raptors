package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.movement.Pose;
import pl.raptors.raptorsRobotsApp.domain.robots.Robot;
import pl.raptors.raptorsRobotsApp.service.robots.RobotService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/robots")
public class RobotController {

    @Autowired
    RobotService robotService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER') or hasAuthority('ROLE_ROBOT')")
    @GetMapping("/all")
    public List<Robot> getAll() {
        return robotService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER') or hasAuthority('ROLE_ROBOT')")
    @GetMapping("/allById")
    public List<String> getAllById() {
        return robotService.getAllById();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_ROBOT')")
    @PostMapping("/add")
    //http://localhost:8080/robots/add?password=passy   <-- passy to nasze haslo
    public Robot add(@RequestBody @Valid Robot robot,@RequestParam(required = false) String password) {
        if (robot.getId() != null) {
            return robotService.updateOne(robot);
        } else {
            //return robotService.addOne(robot);
            if(password==null)
                password="robot";
            return robotService.addRobotAndCreateAccount(robot,password);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_ROBOT')")
    @PostMapping("/update")
    public Robot update(@RequestBody @Valid Robot robot) {
        return robotService.updateOne(robot);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER') or hasAuthority('ROLE_ROBOT')")
    @GetMapping("/{id}")
    public Robot getOne(@PathVariable String id) {
        return robotService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER') or hasAuthority('ROLE_ROBOT')")
    @GetMapping("/pose/{id}")
    public Pose getOneRobotPose(@PathVariable String id) {
        return robotService.getOneRobotPose(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_ROBOT')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Robot robot) {
        robotService.deleteOne(robot);
    }
}

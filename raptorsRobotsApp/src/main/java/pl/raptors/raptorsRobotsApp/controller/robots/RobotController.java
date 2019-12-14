package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.Robot;
import pl.raptors.raptorsRobotsApp.service.robots.RobotService;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@RequestMapping("/robots/robots")
@CrossOrigin
public class RobotController {

    @Autowired
    RobotService robotService;

    @GetMapping("/all")
    public List<Robot> getAll() {
        return robotService.getAll();
    }

    @PostMapping("/add")
    public Robot add(@RequestBody @Valid Robot robot) {
        return robotService.addOne(robot);
    }

    @GetMapping("/{id}")
    public Robot getOne(@PathVariable String id) {
        return robotService.getOne(id);
    }

    @GetMapping("/ip/{id}")
    public @ResponseBody
    String getIP(@PathVariable String id, HttpServletResponse response) throws IOException {
        Robot robot = robotService.getOne(id);
        response.addHeader("robot-name",robot.getRobotIp());
        return robot.getRobotIp();
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Robot robot) {
        robotService.deleteOne(robot);
    }
}

package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.Robot;
import pl.raptors.raptorsRobotsApp.service.robots.RobotService;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/robots/robots")
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

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Robot robot) {
        robotService.deleteOne(robot);
    }
}

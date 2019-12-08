package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotModel;
import pl.raptors.raptorsRobotsApp.service.robots.RobotModelService;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/robots/models")
public class RobotModelController {

    @Autowired
    RobotModelService robotModelService;

    @GetMapping("/all")
    public List<RobotModel> getAll() {
        return robotModelService.getAll();
    }

    @PostMapping("/add")
    public RobotModel add(@RequestBody @Valid RobotModel robotModel) {
        return robotModelService.addOne(robotModel);
    }

    @GetMapping("/{id}")
    public RobotModel getOne(@PathVariable String id) {
        return robotModelService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid RobotModel robotModel) {
        robotModelService.deleteOne(robotModel);
    }
}

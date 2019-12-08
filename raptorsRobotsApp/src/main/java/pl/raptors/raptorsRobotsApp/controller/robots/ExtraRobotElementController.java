package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.ExtraRobotElement;
import pl.raptors.raptorsRobotsApp.service.robots.ExtraRobotElementService;

import javax.validation.Valid;
import java.util.List;

@Controller
@RequestMapping("/robots/extra-elements")
public class ExtraRobotElementController {

    @Autowired
    ExtraRobotElementService extraRobotElementService;

    @GetMapping("/all")
    public List<ExtraRobotElement> getAll() {
        return extraRobotElementService.getAll();
    }

    @PostMapping("/add")
    public ExtraRobotElement add(@RequestBody @Valid ExtraRobotElement extraRobotElement) {
        return extraRobotElementService.addOne(extraRobotElement);
    }

    @GetMapping("/{id}")
    public ExtraRobotElement getOne(@PathVariable String id) {
        return extraRobotElementService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid ExtraRobotElement extraRobotElement) {
        extraRobotElementService.deleteOne(extraRobotElement);
    }
}

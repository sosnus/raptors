package pl.raptors.raptorsRobotsApp.controller.robots;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import pl.raptors.raptorsRobotsApp.domain.robots.Log;
import pl.raptors.raptorsRobotsApp.service.robots.LogService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/logs")
public class LogController {
    @Autowired
    LogService logService;

    @GetMapping("/all")
    public List<Log> getAll() {
        return logService.getAll();
    }

    @PostMapping("/add")
    public Log add(@RequestBody @Valid Log log) {
        return logService.addOne(log);
    }

    @PostMapping("/update")
    public Log update(@RequestBody @Valid Log log) {
        return logService.updateOne(log);
    }

    @GetMapping("/{id}")
    public Log getOne(@PathVariable String id) {
        return logService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Log log) {
        logService.deleteOne(log);
    }
}

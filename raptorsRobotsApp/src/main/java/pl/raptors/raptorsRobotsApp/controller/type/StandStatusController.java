package pl.raptors.raptorsRobotsApp.controller.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.type.StandStatus;
import pl.raptors.raptorsRobotsApp.service.type.StandStatusService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/type/stand-statuses")
public class StandStatusController {

    @Autowired
    StandStatusService standStatusService;

    @GetMapping("/all")
    public List<StandStatus> getAll() {
        return standStatusService.getAll();
    }

    @PostMapping("/add")
    public StandStatus add(@RequestBody @Valid StandStatus standStatus) {
        return standStatusService.addOne(standStatus);
    }

    @GetMapping("/{id}")
    public StandStatus getOne(@PathVariable String id) {
        return standStatusService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid StandStatus standStatus) {
        standStatusService.deleteOne(standStatus);
    }
}

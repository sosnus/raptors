package pl.raptors.raptorsRobotsApp.controller.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.type.StandStatus;
import pl.raptors.raptorsRobotsApp.service.type.StandStatusService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/type/stand-statuses")
public class StandStatusController {

    @Autowired
    StandStatusService standStatusService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<StandStatus> getAll() {
        return standStatusService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_SERVICEMAN')")
    @PostMapping("/add")
    public StandStatus add(@RequestBody @Valid StandStatus standStatus) {
        if (standStatus.getId() != null) {
            return standStatusService.updateOne(standStatus);
        } else {
            return standStatusService.addOne(standStatus);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_SERVICEMAN')")
    @PostMapping("/update")
    public StandStatus update(@RequestBody @Valid StandStatus standStatus) {
        return standStatusService.updateOne(standStatus);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public StandStatus getOne(@PathVariable String id) {
        return standStatusService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_SERVICEMAN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid StandStatus standStatus) {
        standStatusService.deleteOne(standStatus);
    }
}

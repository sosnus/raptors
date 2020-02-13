package pl.raptors.raptorsRobotsApp.controller.type;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.type.StandType;
import pl.raptors.raptorsRobotsApp.service.type.StandTypeService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/type/stand-types")
public class StandTypeController {

    private StandTypeService standTypeService;

    public StandTypeController(StandTypeService service) {
        this.standTypeService = service;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<StandType> getAll() {
        return standTypeService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public StandType getOne(@PathVariable String id) {
        return standTypeService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_SERVICEMAN')")
    @PostMapping("/add")
    public StandType add(@RequestBody @Valid StandType standType) {
        if (standType.getId() != null) {
            return standTypeService.updateOne(standType);
        } else {
            return standTypeService.addOne(standType);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_SERVICEMAN')")
    @PostMapping("/update")
    public StandType update(@RequestBody @Valid StandType standType) {
        return standTypeService.updateOne(standType);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_SERVICEMAN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid StandType standType) {
        standTypeService.deleteOne(standType);
    }

}

package pl.raptors.raptorsRobotsApp.controller.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.type.PropulsionType;
import pl.raptors.raptorsRobotsApp.service.type.PropulsionTypeService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/type/propulsion-types")
public class PropulsionTypeController {
    @Autowired
    PropulsionTypeService propulsionTypeService;
    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<PropulsionType> getAll() {
        return propulsionTypeService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/add")
    public PropulsionType add(@RequestBody @Valid PropulsionType propulsionType) {
        if (propulsionType.getId() != null) {
            return propulsionTypeService.updateOne(propulsionType);
        } else {
            return propulsionTypeService.addOne(propulsionType);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/update")
    public PropulsionType update(@RequestBody @Valid PropulsionType propulsionType) {
        return propulsionTypeService.updateOne(propulsionType);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public PropulsionType getOne(@PathVariable String id) {
        return propulsionTypeService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid PropulsionType propulsionType) {
        propulsionTypeService.deleteOne(propulsionType);
    }
}

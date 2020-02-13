package pl.raptors.raptorsRobotsApp.controller.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.type.AreaType;
import pl.raptors.raptorsRobotsApp.service.type.AreaTypeService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/type/area-types")
public class AreaTypeController {
    @Autowired
    AreaTypeService areaTypeService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<AreaType> getAll() {
        return areaTypeService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/add")
    public AreaType add(@RequestBody @Valid AreaType areaType) {
        if (areaType.getId() != null) {
            return areaTypeService.updateOne(areaType);
        } else {
            return areaTypeService.addOne(areaType);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/update")
    public AreaType update(@RequestBody @Valid AreaType areaType) {
        return areaTypeService.updateOne(areaType);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public AreaType getOne(@PathVariable String id) {
        return areaTypeService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid AreaType areaType) {
        areaTypeService.deleteOne(areaType);
    }
}

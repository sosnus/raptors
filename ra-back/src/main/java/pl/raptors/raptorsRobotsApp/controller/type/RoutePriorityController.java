package pl.raptors.raptorsRobotsApp.controller.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.type.RoutePriority;
import pl.raptors.raptorsRobotsApp.service.type.RoutePriorityService;


import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/type/route-priorities")
public class RoutePriorityController {
    @Autowired
    RoutePriorityService routePriorityService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<RoutePriority> getAll() {
        return routePriorityService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_SERVICEMAN')")
    @PostMapping("/add")
    public RoutePriority add(@RequestBody @Valid RoutePriority routePriority) {
        if (routePriority.getId() != null) {
            return routePriorityService.updateOne(routePriority);
        } else {
            return routePriorityService.addOne(routePriority);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_SERVICEMAN')")
    @PostMapping("/update")
    public RoutePriority update(@RequestBody @Valid RoutePriority routePriority) {
        return routePriorityService.updateOne(routePriority);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public RoutePriority getOne(@PathVariable String id) {
        return routePriorityService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_SERVICEMAN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid RoutePriority routePriority) {
        routePriorityService.deleteOne(routePriority);
    }
}

package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.BatteryType;
import pl.raptors.raptorsRobotsApp.service.robots.BatteryTypeService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/robots/battery-types")
public class BatteryTypeController {

    @Autowired
    BatteryTypeService batteryTypeService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<BatteryType> getAll() {
        return batteryTypeService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/add")
    public BatteryType add(@RequestBody @Valid BatteryType batteryType) {
        if (batteryType.getId() != null) {
            return batteryTypeService.updateOne(batteryType);
        } else {
            return batteryTypeService.addOne(batteryType);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/update")
    public BatteryType update(@RequestBody @Valid BatteryType batteryType) {
        return batteryTypeService.updateOne(batteryType);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public BatteryType getOne(@PathVariable String id) {
        return batteryTypeService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid BatteryType batteryType) {
        batteryTypeService.deleteOne(batteryType);
    }
}

package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.movement.MapArea;
import pl.raptors.raptorsRobotsApp.service.movement.MapAreaService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/movement/map-areas")
public class MapAreaController {
    @Autowired
    MapAreaService mapAreaService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<MapArea> getAll() {
        return mapAreaService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/add")
    public MapArea add(@RequestBody @Valid MapArea mapArea) {
        if (mapArea.getId() != null) {
            return mapAreaService.updateOne(mapArea);
        } else {
            return mapAreaService.addOne(mapArea);
        }
    }
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/update")
    public MapArea update(@RequestBody @Valid MapArea mapArea) {
        return mapAreaService.updateOne(mapArea);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public MapArea getOne(@PathVariable String id) {
        return mapAreaService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid MapArea mapArea) { mapAreaService.deleteOne(mapArea); }
}

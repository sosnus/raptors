package pl.raptors.ra_back.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.ra_back.domain.mapsMetadata.Maps;
import pl.raptors.ra_back.service.mapsMetadata.MapsService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/movement/maps/new")
public class MapsController {

    @Autowired
    MapsService mapsService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<Maps> getAll() {
        return mapsService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @PostMapping("/add")
    public Maps addOne(@RequestBody @Valid Maps maps) {
        if(maps.getId() != null) {
            return mapsService.updateOne(maps);
        } else {
            return mapsService.addOne(maps);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/update")
    public Maps update(@RequestBody @Valid Maps maps) {
        return mapsService.updateOne(maps);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public Maps getOne(@PathVariable String id) {
        return mapsService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Maps maps) {
        mapsService.deleteOne(maps);
    }
}





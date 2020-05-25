package pl.raptors.raptorsRobotsApp.controller.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.type.ParkingType;
import pl.raptors.raptorsRobotsApp.service.type.ParkingTypeService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/type/parking-types")
public class ParkingTypeController {

    @Autowired
    ParkingTypeService parkingTypeService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<ParkingType> getAll() {
        return parkingTypeService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/add")
    public ParkingType add(@RequestBody @Valid ParkingType parkingType) {
        if (parkingType.getId() != null) {
            return parkingTypeService.updateOne(parkingType);
        } else {
            return parkingTypeService.addOne(parkingType);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/update")
    public ParkingType update(@RequestBody @Valid ParkingType parkingType) {
        return parkingTypeService.updateOne(parkingType);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public ParkingType getOne(@PathVariable String id) {
        return parkingTypeService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid ParkingType parkingType) {
        parkingTypeService.deleteOne(parkingType);
    }
}

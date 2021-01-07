package pl.raptors.ra_back.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.ra_back.domain.tasks.KioskTaskMapping;
import pl.raptors.ra_back.service.tasks.KioskTaskMappingService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/tasks/kiosk-mappings")
public class KioskTaskMappingController {

    @Autowired
    KioskTaskMappingService kioskTaskMappingService;

    //@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<KioskTaskMapping> getAll() {
        List<KioskTaskMapping> kioskTaskMappings = kioskTaskMappingService.getAll();
//        for (KioskTaskMapping r:taskTemplates      ) {
//            System.out.println(r);
//        }
//        System.out.println(taskTemplates);
        return kioskTaskMappings;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_REGULAR_USER')")
    @PostMapping("/add")
    public KioskTaskMapping add(@RequestBody @Valid KioskTaskMapping kioskTaskMapping) {
        if (kioskTaskMapping.getId() != null) {
            return kioskTaskMappingService.updateOne(kioskTaskMapping);
        } else {
            return kioskTaskMappingService.addOne(kioskTaskMapping);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_REGULAR_USER')")
    @PostMapping("/update")
    public KioskTaskMapping update(@RequestBody @Valid KioskTaskMapping kioskTaskMapping) {
        return kioskTaskMappingService.updateOne(kioskTaskMapping);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public KioskTaskMapping getOne(@PathVariable String id) {
        return kioskTaskMappingService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_REGULAR_USER')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid KioskTaskMapping kioskTaskMapping) {
        kioskTaskMappingService.deleteOne(kioskTaskMapping);
    }
}

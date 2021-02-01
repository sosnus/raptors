package pl.raptors.ra_back.controller.kiosk;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.ra_back.domain.kiosk.Kiosk;
import pl.raptors.ra_back.service.kiosk.KioskService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/kiosks")
public class KioskController {

    @Autowired
    private KioskService kioskService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @GetMapping("/all")
    public List<Kiosk> getAll() {
        return kioskService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_ROBOT')")
    @PostMapping("/add")
    public Kiosk add(@RequestBody @Valid Kiosk kiosk) {
        if (kiosk.getId() != null) {
            return kioskService.updateOne(kiosk);
        } else {
            return kioskService.addOne(kiosk);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_ROBOT')")
    @PostMapping("/update")
    public Kiosk update(@RequestBody @Valid Kiosk kiosk) {
        return kioskService.updateOne(kiosk);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_ROBOT')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Kiosk kiosk) {
        kioskService.deleteOne(kiosk);
    }
}

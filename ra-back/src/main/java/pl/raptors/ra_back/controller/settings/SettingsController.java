package pl.raptors.ra_back.controller.settings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.ra_back.domain.settings.ContactInfo;
import pl.raptors.ra_back.domain.settings.CurrentMap;
import pl.raptors.ra_back.domain.settings.InstanceInfo;
import pl.raptors.ra_back.service.settings.ContactInfoService;
import pl.raptors.ra_back.service.settings.CurrentMapService;
import pl.raptors.ra_back.service.settings.InstanceInfoService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/settings")
public class SettingsController {

    @Autowired
    private CurrentMapService currentMapService;
    @Autowired
    private InstanceInfoService instanceInfoService;
    @Autowired
    private ContactInfoService contactInfoService;


    //@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @GetMapping("/getCurrentMap")
    public CurrentMap getCurrentMap() {
        return currentMapService.getAll().get(0);
    }

    //@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @GetMapping("/getInstanceInfo")
    public InstanceInfo getInstanceInfo() {
        return instanceInfoService.getAll().get(0);
    }

    //@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @GetMapping("/getContactInfo")
    public List<ContactInfo> getContactInfo() {
        return contactInfoService.getAll();
    }

    @GetMapping("/updateCurrentMap/{id}")
    public CurrentMap updateCurrentMap(@PathVariable String id) {
        return currentMapService.update(id);
    }

    @PostMapping("/updateInstanceInfo")
    public InstanceInfo updateInstanceInfo(@RequestBody @Valid InstanceInfo instanceInfo) {
        return instanceInfoService.updateOne(instanceInfo);
    }

    @PostMapping("/updateContactInfo")
    public ContactInfo[] updateContactInfo(@RequestBody @Valid ContactInfo[] contactInfo) {
        ContactInfo contactInfo1 = contactInfoService.updateOne(contactInfo[0]);
        ContactInfo contactInfo2 = contactInfoService.updateOne(contactInfo[1]);
        System.out.println("czy ten spring działą wgle?\n");
        System.out.println(contactInfo1);
        System.out.println(contactInfo2);
        ContactInfo[] contactInfos = new ContactInfo[2];
        contactInfos[0] = contactInfo1;
        contactInfo[1] = contactInfo2;
        return  contactInfos;
    }
}

package pl.raptors.raptorsRobotsApp.controller.accounts;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.accounts.Role;
import pl.raptors.raptorsRobotsApp.service.accounts.RoleService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;


    @GetMapping("/{roleId}")
    public String getRoleName(@PathVariable String roleId){
        try {
            return roleService.getOne(roleId).getName();
        } catch (Exception e) {
            return null;
        }
    }


}

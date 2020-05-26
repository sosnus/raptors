package pl.raptors.raptorsRobotsApp.controller.accounts;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.accounts.Role;
import pl.raptors.raptorsRobotsApp.service.accounts.RoleService;

import javax.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @GetMapping("/{roleId}")
    public String getRoleName(@PathVariable String roleId) {
        try {
            return roleService.getOne(roleId).getName();
        } catch (Exception e) {
            return null;
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/update")
    public Role update(@RequestBody @Valid Role role) {
        return roleService.updateOne(role);
    }

}

package pl.raptors.raptorsRobotsApp.controller.accounts;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.accounts.User;
import pl.raptors.raptorsRobotsApp.domain.robots.BatteryType;
import pl.raptors.raptorsRobotsApp.service.accounts.MongoUserDetailsService;
import pl.raptors.raptorsRobotsApp.service.accounts.RoleService;
import pl.raptors.raptorsRobotsApp.service.accounts.UserService;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    MongoUserDetailsService mongoUserDetailsService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    RoleService roleService;


    @RequestMapping("/login")
    public User login(@RequestBody User user) {
        User userFromDb = userService.getByEmail(user.getEmail());
        List<String> roleNames= new ArrayList<>();
        if(user.getEmail().equals(userFromDb.getEmail()) && passwordEncoder.matches(user.getPassword(), userFromDb.getPassword())){
            for (String roleId:userFromDb.getRolesIDs()) {
                roleNames.add(roleService.getOne(roleId).getName());
            }
            userFromDb.setRolesIDs(roleNames);
            return userFromDb;
        }
        else{
            System.out.println("Logowanie nie powiodło się!");
            return null;
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SUPER_USER')")
    @PostMapping("/update")
    public void update(@RequestBody @Valid User user) {
         userService.updateOne(user);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SUPER_USER')")
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable String id) {
        userService.deleteById(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SUPER_USER')")
    @PostMapping("/add")
    public void addOne(@RequestBody User user) {
        if (user.getId() != null) {
            user.setRolesIDs(roleService.getRoleIdByName(user.getRolesIDs()));
            userService.updateOne(user);
        } else {
            user.setRolesIDs(roleService.getRoleIdByName(user.getRolesIDs()));
            userService.addOne(user);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<User> getAll() {
        List<User> usersWithRoleName= new ArrayList<>();
        for (User user : userService.getAll()) {
            List<String> roleNames= new ArrayList<>();
            for (String roleId:user.getRolesIDs()) {
                roleNames.add(roleService.getOne(roleId).getName());
            }
            user.setRolesIDs(roleNames);
            usersWithRoleName.add(user);
        };
        return usersWithRoleName;
    }
}
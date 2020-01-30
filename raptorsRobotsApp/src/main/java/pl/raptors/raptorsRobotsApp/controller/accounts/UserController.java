package pl.raptors.raptorsRobotsApp.controller.accounts;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.accounts.User;
import pl.raptors.raptorsRobotsApp.service.accounts.MongoUserDetailsService;
import pl.raptors.raptorsRobotsApp.service.accounts.UserService;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    MongoUserDetailsService mongoUserDetailsService;
    @Autowired
    PasswordEncoder passwordEncoder;


    @RequestMapping("/login")
    public boolean login(@RequestBody User user) {

        try {
            User userFromDb = userService.getByEmail(user.getEmail());
            return user.getEmail().equals(userFromDb.getEmail()) && passwordEncoder.matches(user.getPassword(), userFromDb.getPassword());
        } catch (Exception e) {
            return false;
        }
    }

    @GetMapping("/byEmail/{email}")
    public User getUserByEmail(@PathVariable String email){
        try {
            return userService.getByEmailWithRoleName(email);
        } catch (Exception e) {
            return null;
        }
    }

    @GetMapping("/all")
    public List<User> getAll() {

        return this.userService.getAll();
    }
}
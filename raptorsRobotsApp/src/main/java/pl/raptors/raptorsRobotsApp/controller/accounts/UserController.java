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

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping("/login")
    public boolean login(@RequestBody User user) {

        //System.out.println(user.getEmail() + " " + user.getPassword());
        try {
            User userFromDb = userService.getByEmail(user.getEmail());
            //System.out.println(user.getEmail().equals(userFromDb.getEmail()) && passwordEncoder.matches(user.getPassword(), userFromDb.getPassword()));
            return user.getEmail().equals(userFromDb.getEmail()) && passwordEncoder.matches(user.getPassword(), userFromDb.getPassword());
        } catch (Exception e) {
            return false;
        }
    }


    @GetMapping("/all")
    public List<User> getAll() {

        return this.userService.getAll();
    }
}
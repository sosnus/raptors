package pl.raptors.raptorsRobotsApp.controller.accounts;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.configuration.SecurityConfiguration;
import pl.raptors.raptorsRobotsApp.domain.accounts.User;
import pl.raptors.raptorsRobotsApp.service.accounts.MongoUserDetailsService;
import pl.raptors.raptorsRobotsApp.service.accounts.UserService;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Base64;
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

/*    @RequestMapping("/login")
    public UserDetails login(@RequestBody User user) {
        return mongoUserDetailsService.loadUserByUsername(user.getEmail());
    }*/

    @RequestMapping("/login")
    public boolean login(@RequestBody User user) {
        return user.getEmail().equals("user@mail.com") && user.getPassword().equals(passwordEncoder.encode("user"));
    }

    @RequestMapping("/user")
    public Principal user(HttpServletRequest request) {
        String authToken = request.getHeader("Authorization")
                .substring("Basic".length()).trim();
        return () ->  new String(Base64.getDecoder()
                .decode(authToken)).split(":")[0];
    }
    @GetMapping("/all")
    public List<User> getAll() {

        return this.userService.getAll();
    }
}

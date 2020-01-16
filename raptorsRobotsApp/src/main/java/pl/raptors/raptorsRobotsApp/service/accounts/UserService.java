package pl.raptors.raptorsRobotsApp.service.accounts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.accounts.User;
import pl.raptors.raptorsRobotsApp.repository.accounts.RoleRepository;
import pl.raptors.raptorsRobotsApp.repository.accounts.UserRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;


import java.util.List;

//@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SUPER_USER')")
@Service
public class UserService implements CRUDService<User> {

    @Autowired
    UserRepository userRepository;
    @Autowired
    RoleRepository roleRepository;
    @Autowired
    PasswordEncoder bCryptPasswordEncoder;

    @Override
    public User addOne(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles(user.getRoles());
        return userRepository.save(user);
    }

    public User getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User getOne(String id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public List<User> getAll() {
        return userRepository.findAll();
    }

    @Override
    public User updateOne(User user) {
        return userRepository.save(user);
    }

    @Override
    public void deleteOne(User user) {
        userRepository.delete(user);
    }
}
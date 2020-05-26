package pl.raptors.ra_back.service.accounts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.accounts.User;
import pl.raptors.ra_back.repository.accounts.RoleRepository;
import pl.raptors.ra_back.repository.accounts.UserRepository;
import pl.raptors.ra_back.service.CRUDService;


import java.util.List;

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
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public void deleteOne(User user) {
        userRepository.delete(user);
    }

    public void deleteById(String id) {
        userRepository.findById(id).ifPresent(user -> userRepository.delete(user));
    }

    @Override
    public void deleteAll(List<User> userList){
        for (User user : userList) {
            this.deleteOne(user);
        }
    }
}

package pl.raptors.ra_back.service.accounts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import pl.raptors.ra_back.repository.accounts.RoleRepository;
import pl.raptors.ra_back.repository.accounts.UserRepository;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class MongoUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        pl.raptors.ra_back.domain.accounts.User user = userRepository.findByEmail(email);
        if (user == null) {
            System.out.println("nie znaleziono użytkownika w bazie.");//debug purpose
            throw new UsernameNotFoundException("User not found");
        }

        //przyznanie dostępu do poszczegolnych serwisow za pomoca roli
        List<SimpleGrantedAuthority> authorities= new ArrayList<>();
        if(!user.getRolesIDs().isEmpty()){
            for (String roleId:user.getRolesIDs()){
                // rolesList.add(roleRepository.findRoleById(roleId).getName(););
                authorities.add(new SimpleGrantedAuthority(roleRepository.findRoleById(roleId).getName()));
            }
        }
        else{
            //jesli nie ma zadnej przypisanej roli to daje mu REGULAR_USER
            authorities= Arrays.asList(new SimpleGrantedAuthority("ROLE_REGULAR_USER"));
        }

        //List<SimpleGrantedAuthority> authorities = Arrays.asList(new SimpleGrantedAuthority("ROLE_REGULAR_USER"),new SimpleGrantedAuthority("ROLE_ADMIN"));
        return new User(user.getEmail(), user.getPassword(), authorities);
    }
}

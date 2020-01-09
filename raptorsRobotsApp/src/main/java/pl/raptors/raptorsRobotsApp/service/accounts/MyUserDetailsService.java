package pl.raptors.raptorsRobotsApp.service.accounts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import pl.raptors.raptorsRobotsApp.domain.accounts.Role;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service("myUserDetailsService")
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Transactional(readOnly = true)
    @Override
    public UserDetails loadUserByUsername(final String email) throws UsernameNotFoundException {

        pl.raptors.raptorsRobotsApp.domain.accounts.User user = userService.getByEmail(email);
        List<GrantedAuthority> authorities = buildUserAuthority(user.getRoles());
        return buildUserForAuthentication(user, authorities);
    }

    private User buildUserForAuthentication(pl.raptors.raptorsRobotsApp.domain.accounts.User user, List<GrantedAuthority> authorities) {

        return new User(user.getEmail(), user.getPassword(), true, true, true, true, authorities);
    }

    private List<GrantedAuthority> buildUserAuthority(List<Role> roles) {

        Set<GrantedAuthority> setAuths = new HashSet<>();

        for (Role role : roles) {
            setAuths.add(new SimpleGrantedAuthority(role.getName()));
        }
        List<GrantedAuthority> result = new ArrayList<>(setAuths);
        return result;
    }

}

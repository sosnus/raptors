package pl.raptors.raptorsRobotsApp.service.accounts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.accounts.Role;
import pl.raptors.raptorsRobotsApp.repository.accounts.RoleRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;
@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@Service
public class RoleService implements CRUDService<Role> {

    @Autowired
    RoleRepository roleRepository;

    @Override
    public Role addOne(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public Role getOne(String id) {
        return roleRepository.findById(id).orElse(null);
    }

    @Override
    public List<Role> getAll() {
        return roleRepository.findAll();
    }

    @Override
    public Role updateOne(Role role) {
        return roleRepository.save(role);
    }

    @Override
    public void deleteOne(Role role) {
        roleRepository.delete(role);
    }
}

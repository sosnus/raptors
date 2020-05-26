package pl.raptors.raptorsRobotsApp.service.accounts;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.accounts.Role;
import pl.raptors.raptorsRobotsApp.repository.accounts.RoleRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.ArrayList;
import java.util.List;

@Service
public class RoleService implements CRUDService<Role> {

    @Autowired
    RoleRepository roleRepository;

    public List<String> getRoleIdByName (List<String> rolesNames){
        List<String> rolesIds = new ArrayList<>();
        for (Role role : roleRepository.findRolesByNameIn(rolesNames)) {
            rolesIds.add(role.getId());
        };
        return  rolesIds;
    }

    public String getRoleIdByRoleName (String roleName){
        return roleRepository.findIdByName(roleName).getId();
    }

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

    @Override
    public void deleteAll(List<Role> roleList){
        for (Role role : roleList) {
            this.deleteOne(role);
        }
    }
}

package pl.raptors.raptorsRobotsApp.repository.accounts;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.accounts.Role;

import java.util.List;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
    Role findRoleById(String id);
    List<Role> findRolesByNameIn(List<String> roleNames);
    Role findIdByName(String roleName);
}

package pl.raptors.raptorsRobotsApp.repository.accounts;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.accounts.Role;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
}

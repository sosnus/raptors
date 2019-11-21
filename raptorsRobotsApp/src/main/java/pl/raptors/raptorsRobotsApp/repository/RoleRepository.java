package pl.raptors.raptorsRobotsApp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.Role;

@Repository
public interface RoleRepository extends MongoRepository<Role, String> {
}

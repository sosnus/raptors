package pl.raptors.raptorsRobotsApp.repository.accounts;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.accounts.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
}
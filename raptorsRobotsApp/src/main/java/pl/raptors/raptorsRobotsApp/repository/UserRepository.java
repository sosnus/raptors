package pl.raptors.raptorsRobotsApp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
}
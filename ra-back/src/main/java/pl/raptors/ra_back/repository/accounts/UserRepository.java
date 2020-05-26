package pl.raptors.ra_back.repository.accounts;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.accounts.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
}

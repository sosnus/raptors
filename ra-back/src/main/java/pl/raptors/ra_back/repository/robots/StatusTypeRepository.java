package pl.raptors.ra_back.repository.robots;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.robots.StatusType;

@Repository
public interface StatusTypeRepository extends MongoRepository<StatusType,String> {
}

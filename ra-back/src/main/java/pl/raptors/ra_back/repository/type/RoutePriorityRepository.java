package pl.raptors.ra_back.repository.type;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.type.RoutePriority;

@Repository
public interface RoutePriorityRepository extends MongoRepository<RoutePriority,String> {
    public RoutePriority findByName(String name);
}

package pl.raptors.raptorsRobotsApp.repository.type;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.type.RoutePriority;

@Repository
public interface RoutePriorityRepository extends MongoRepository<RoutePriority,String> {
    public RoutePriority findByName(String name);
}
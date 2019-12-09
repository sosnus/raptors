package pl.raptors.raptorsRobotsApp.repository.type;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.type.StandStatus;

@Repository
public interface StandStatusRepository extends MongoRepository<StandStatus,String> {
    public StandStatus findByName(String name);
}
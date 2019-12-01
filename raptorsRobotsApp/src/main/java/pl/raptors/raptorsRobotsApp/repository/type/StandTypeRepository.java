package pl.raptors.raptorsRobotsApp.repository.type;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.type.StandType;

@Repository
public interface StandTypeRepository extends MongoRepository<StandType,String> {
}

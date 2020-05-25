package pl.raptors.raptorsRobotsApp.repository.type;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.type.PropulsionType;

@Repository
public interface PropulsionTypeRepository extends MongoRepository<PropulsionType,String> {
    public PropulsionType findByName(String name);
}

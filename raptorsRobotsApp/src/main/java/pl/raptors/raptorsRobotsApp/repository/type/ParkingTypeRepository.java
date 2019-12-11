package pl.raptors.raptorsRobotsApp.repository.type;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.type.ParkingType;

@Repository
public interface ParkingTypeRepository extends MongoRepository<ParkingType,String>{
        public ParkingType findByName(String name);
}
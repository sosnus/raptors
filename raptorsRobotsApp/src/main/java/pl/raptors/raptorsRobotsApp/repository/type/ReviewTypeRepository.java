package pl.raptors.raptorsRobotsApp.repository.type;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.type.ReviewType;

@Repository
public interface ReviewTypeRepository extends MongoRepository<ReviewType,String> {
public ReviewType findByName(String name);
}

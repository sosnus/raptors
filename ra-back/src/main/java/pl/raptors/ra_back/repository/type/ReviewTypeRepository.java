package pl.raptors.ra_back.repository.type;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.type.ReviewType;

@Repository
public interface ReviewTypeRepository extends MongoRepository<ReviewType,String> {
public ReviewType findByName(String name);
}

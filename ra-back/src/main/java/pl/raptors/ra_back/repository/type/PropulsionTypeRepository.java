package pl.raptors.ra_back.repository.type;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.type.PropulsionType;

@Repository
public interface PropulsionTypeRepository extends MongoRepository<PropulsionType,String> {
    public PropulsionType findByName(String name);
}

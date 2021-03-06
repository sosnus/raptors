package pl.raptors.ra_back.repository.type;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.type.StandType;

@Repository
public interface StandTypeRepository extends MongoRepository<StandType,String> {

    public StandType findByName(String name);
}

package pl.raptors.ra_back.repository.type;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.type.StandStatus;

@Repository
public interface StandStatusRepository extends MongoRepository<StandStatus,String> {
    public StandStatus findByName(String name);
}

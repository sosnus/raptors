package pl.raptors.ra_back.repository.settings;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.settings.CurrentMap;

@Repository
public interface CurrentMapRepository extends MongoRepository<CurrentMap, String> {
}

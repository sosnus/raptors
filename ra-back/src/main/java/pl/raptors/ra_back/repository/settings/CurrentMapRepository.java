package pl.raptors.ra_back.repository.settings;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.settings.MapInfo;

@Repository
public interface CurrentMapRepository extends MongoRepository<MapInfo, String> {
}

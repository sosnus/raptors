package pl.raptors.ra_back.repository.mapsMetadata;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.mapsMetadata.MapRotation;

@Repository
public interface MapRotationRepository extends MongoRepository<MapRotation, String> {
}

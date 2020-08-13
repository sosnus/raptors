package pl.raptors.ra_back.repository.mapsMetadata;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.mapsMetadata.MapMetadata;

@Repository
public interface MapMetadataRepository extends MongoRepository<MapMetadata, String> {
}

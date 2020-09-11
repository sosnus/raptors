package pl.raptors.ra_back.repository.mapsMetadata;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.mapsMetadata.MapTransformation;

@Repository
public interface MapTransformationRepository extends MongoRepository<MapTransformation, String> {
}

package pl.raptors.ra_back.repository.movement;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.movement.MapArea;
import pl.raptors.ra_back.domain.movement.MovementMap;
import pl.raptors.ra_back.domain.type.AreaType;

import java.util.List;

@Repository
public interface MapAreaRepository extends MongoRepository<MapArea, String> {
    List<MapArea> findAllByMap(MovementMap map);
    List<MapArea> findAllByType(AreaType areaType);
}

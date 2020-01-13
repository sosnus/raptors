package pl.raptors.raptorsRobotsApp.repository.movement;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.movement.MapArea;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementMap;
import pl.raptors.raptorsRobotsApp.domain.movement.UniversalPoint;
import pl.raptors.raptorsRobotsApp.domain.type.AreaType;

import java.util.List;

@Repository
public interface MapAreaRepository extends MongoRepository<MapArea, String> {
    List<MapArea> findAllByMap(MovementMap map);
    List<MapArea> findAllByType(AreaType areaType);
}
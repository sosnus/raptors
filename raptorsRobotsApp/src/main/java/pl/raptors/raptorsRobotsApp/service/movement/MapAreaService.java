package pl.raptors.raptorsRobotsApp.service.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.MapArea;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementMap;
import pl.raptors.raptorsRobotsApp.domain.movement.UniversalPoint;
import pl.raptors.raptorsRobotsApp.domain.type.AreaType;
import pl.raptors.raptorsRobotsApp.repository.movement.MapAreaRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

//@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@Service
public class MapAreaService implements CRUDService<MapArea> {

    @Autowired
    MapAreaRepository mapAreaRepository;

    @Override
    public MapArea addOne(MapArea mapArea) {
        return mapAreaRepository.save(mapArea);
    }

    @Override
    public MapArea getOne(String id) {
        return mapAreaRepository.findById(id).orElse(null);
    }

    @Override
    public List<MapArea> getAll() {
        return mapAreaRepository.findAll();
    }

    @Override
    public MapArea updateOne(MapArea mapArea) {
        return mapAreaRepository.save(mapArea);
    }

    @Override
    public void deleteOne(MapArea mapArea) {
        mapAreaRepository.delete(mapArea);
    }

    List<MapArea> getAreasByMap(MovementMap map) {
        return mapAreaRepository.findAllByMap(map);
    }

    public List<MapArea> getAreasByType(AreaType areaType) {
        return mapAreaRepository.findAllByType(areaType);
    }
}
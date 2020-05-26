package pl.raptors.ra_back.service.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.movement.MapArea;
import pl.raptors.ra_back.domain.movement.MovementMap;
import pl.raptors.ra_back.domain.type.AreaType;
import pl.raptors.ra_back.repository.movement.MapAreaRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.util.List;

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

    @Override
    public void deleteAll(List<MapArea> mapAreaList) {
        for (MapArea mapArea : mapAreaList) {
            this.deleteOne(mapArea);
        }
    }

    List<MapArea> getAreasByMap(MovementMap map) {
        return mapAreaRepository.findAllByMap(map);
    }

    public List<MapArea> getAreasByType(AreaType areaType) {
        return mapAreaRepository.findAllByType(areaType);
    }
}

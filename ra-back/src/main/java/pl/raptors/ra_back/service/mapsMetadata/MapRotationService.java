package pl.raptors.ra_back.service.mapsMetadata;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.mapsMetadata.MapRotation;
import pl.raptors.ra_back.repository.mapsMetadata.MapRotationRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.util.List;

@Service
public class MapRotationService implements CRUDService<MapRotation> {

    @Autowired
    MapRotationRepository mapRotationRepository;

    @Override
    public MapRotation addOne(MapRotation mapRotation) {
        return mapRotationRepository.save(mapRotation);
    }

    @Override
    public MapRotation getOne(String id) {
        return mapRotationRepository.findById(id).orElse(null);
    }

    @Override
    public List<MapRotation> getAll() {
        return mapRotationRepository.findAll();
    }

    @Override
    public MapRotation updateOne(MapRotation mapRotation) {
        return mapRotationRepository.save(mapRotation);
    }

    @Override
    public void deleteOne(MapRotation mapRotation) {
        this.mapRotationRepository.delete(mapRotation);
    }

    @Override
    public void deleteAll(List<MapRotation> t) {
        for (MapRotation mapRotation : t) {
            this.deleteOne(mapRotation);
        }
    }
}

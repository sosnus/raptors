package pl.raptors.ra_back.service.mapsMetadata;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.mapsMetadata.MapTransformation;
import pl.raptors.ra_back.repository.mapsMetadata.MapTransformationRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.util.List;

@Service
public class MapTransformationService implements CRUDService<MapTransformation> {

    @Autowired
    MapTransformationRepository mapTransformationRepository;

    @Override
    public MapTransformation addOne(MapTransformation mapTransformation) {
        return mapTransformationRepository.save(mapTransformation);
    }

    @Override
    public MapTransformation getOne(String id) {
        return mapTransformationRepository.findById(id).orElse(null);
    }

    @Override
    public List<MapTransformation> getAll() {
        return mapTransformationRepository.findAll();
    }

    @Override
    public MapTransformation updateOne(MapTransformation mapTransformation) {
        return mapTransformationRepository.save(mapTransformation);
    }

    @Override
    public void deleteOne(MapTransformation mapTransformation) {
        this.mapTransformationRepository.delete(mapTransformation);
    }

    @Override
    public void deleteAll(List<MapTransformation> t) {
        for (MapTransformation mapTransformation : t) {
            this.deleteOne(mapTransformation);
        }
    }
}

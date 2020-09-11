package pl.raptors.ra_back.service.mapsMetadata;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.mapsMetadata.MapMetadata;
import pl.raptors.ra_back.repository.mapsMetadata.MapMetadataRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.util.List;

@Service
public class MapMetadataService implements CRUDService<MapMetadata> {

    @Autowired
    MapMetadataRepository mapMetadataRepository;

    @Override
    public MapMetadata addOne(MapMetadata mapMetadata) {
        return mapMetadataRepository.save(mapMetadata);
    }

    @Override
    public MapMetadata getOne(String id) {
        return mapMetadataRepository.findById(id).orElse(null);
    }

    @Override
    public List<MapMetadata> getAll() {
        return mapMetadataRepository.findAll();
    }

    @Override
    public MapMetadata updateOne(MapMetadata mapMetadata) {
        return mapMetadataRepository.save(mapMetadata);
    }

    @Override
    public void deleteOne(MapMetadata mapMetadata) {
        mapMetadataRepository.delete(mapMetadata);
    }

    @Override
    public void deleteAll(List<MapMetadata> t) {
        for (MapMetadata mapMetadata : t) {
            this.deleteOne(mapMetadata);
        }
    }
}

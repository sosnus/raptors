package pl.raptors.ra_back.service.mapsMetadata;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.mapsMetadata.MapMetadata;
import pl.raptors.ra_back.domain.mapsMetadata.MapRotation;
import pl.raptors.ra_back.domain.mapsMetadata.MapTransformation;
import pl.raptors.ra_back.domain.mapsMetadata.Maps;
import pl.raptors.ra_back.repository.mapsMetadata.MapsRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.util.List;
@Service
public class MapsService implements CRUDService<Maps> {

    @Autowired
    MapsRepository mapsRepository;

    public Maps addMaps(String urlYaml, String urlPng, String urlPgm, String[] tags, MapMetadata mapMetadata, MapTransformation mapTransformation, MapRotation mapRotation) {
        Maps maps = new Maps(urlYaml, urlPng, urlPgm, tags, mapMetadata, mapTransformation, mapRotation);
        return mapsRepository.save(maps);
    }

    @Override
    public Maps addOne(Maps maps) {
        return mapsRepository.save(maps);
    }

    @Override
    public Maps getOne(String id) {
        return mapsRepository.findById(id).orElse(null);
    }

    @Override
    public List<Maps> getAll() {
        return mapsRepository.findAll();
    }

    @Override
    public Maps updateOne(Maps maps) {
        return mapsRepository.save(maps);
    }

    @Override
    public void deleteOne(Maps maps) {
        mapsRepository.delete(maps);
    }

    @Override
    public void deleteAll(List<Maps> t) {
        for (Maps maps : t) {
            this.deleteOne(maps);
        }
    }
}

package pl.raptors.ra_back.service.settings;

import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.settings.CurrentMap;
import pl.raptors.ra_back.domain.movement.MovementMap;
import pl.raptors.ra_back.repository.settings.CurrentMapRepository;
import pl.raptors.ra_back.repository.movement.MovementMapRepository;
import pl.raptors.ra_back.service.CRUDService;
import pl.raptors.ra_back.service.pgm.PGMIO;

import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;
import java.util.Base64;
import java.io.IOException;
import java.io.ByteArrayInputStream;
import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;

@Service
public class CurrentMapService implements CRUDService<CurrentMap> {

    @Autowired
    private CurrentMapRepository currentMapRepository;

    @Autowired
    private MovementMapRepository movementMapRepository;

    @Override
    public CurrentMap addOne(CurrentMap currentMap) {
        return null;
    }

    @Override
    public CurrentMap getOne(String id) {
        return null;
    }

    @Override
    public List<CurrentMap> getAll() {
        return currentMapRepository.findAll();
    }

    @Override
    public CurrentMap updateOne(CurrentMap currentMap) {
        return currentMapRepository.save(currentMap);
    }
    
    public CurrentMap update(String id) {
        CurrentMap currentMap;
        MovementMap map = movementMapRepository.findById(id).orElse(null);
        if(map!=null) {
            byte[] pgmBytes = map.getMapImage().getData();
            byte[] yamlBytes = map.getYamlFile().getData();
            
            YAMLFactory factory = new YAMLFactory();
            ObjectMapper mapper = new ObjectMapper(new YAMLFactory());
            MapYaml mapYaml;
            try {
                BufferedImage img = ImageIO.read(new ByteArrayInputStream(PGMIO.pgm2jpg(pgmBytes)));
                mapYaml = mapper.readValue(yamlBytes, MapYaml.class);
                currentMap = new CurrentMap(map.getId(), mapYaml.resolution, mapYaml.resolution,
                                        new Integer(img.getHeight()), new Integer(img.getWidth()),
                                        mapYaml.origin[0], mapYaml.origin[1]);
            }
            catch(IOException e) {
                e.printStackTrace();
                return null;
            }
            return currentMapRepository.save(currentMap);
        }
        return null;
    }

    @Override
    public void deleteOne(CurrentMap currentMap) {

    }

    @Override
    public void deleteAll(List<CurrentMap> t) {

    }
}

class MapYaml
{
    public Double free_thresh;
    public String image;
    public Integer negate;
    public Double occupied_thresh;
    public Double[] origin;
    public Double resolution;
}
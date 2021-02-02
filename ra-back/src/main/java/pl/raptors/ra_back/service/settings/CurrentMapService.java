package pl.raptors.ra_back.service.settings;

import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.settings.MapInfo;
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
public class CurrentMapService implements CRUDService<MapInfo> {

    @Autowired
    private CurrentMapRepository currentMapRepository;

    @Autowired
    private MovementMapRepository movementMapRepository;

    @Override
    public MapInfo addOne(MapInfo currentMap) {
        return null;
    }

    @Override
    public MapInfo getOne(String id) {
        return null;
    }

    @Override
    public List<MapInfo> getAll() {
        return currentMapRepository.findAll();
    }

    @Override
    public MapInfo updateOne(MapInfo currentMap) {
        return currentMapRepository.save(currentMap);
    }
    
    public MapInfo update(String id) {
        MapInfo currentMap;
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
                currentMap = new MapInfo(map.getId(), mapYaml.resolution, mapYaml.resolution,
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
    public void deleteOne(MapInfo currentMap) {

    }

    @Override
    public void deleteAll(List<MapInfo> t) {

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
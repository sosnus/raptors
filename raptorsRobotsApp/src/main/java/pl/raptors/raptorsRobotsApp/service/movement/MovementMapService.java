package pl.raptors.raptorsRobotsApp.service.movement;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.raptors.raptorsRobotsApp.domain.movement.MapArea;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementMap;
import pl.raptors.raptorsRobotsApp.domain.movement.Route;
import pl.raptors.raptorsRobotsApp.repository.movement.MovementMapRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.io.IOException;
import java.util.List;

@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@Service
public class MovementMapService implements CRUDService<MovementMap> {

    @Autowired
    MovementMapRepository movementMapRepository;
    @Autowired
    MapAreaService mapAreaService;
    @Autowired
    RouteService routeService;

    public MovementMap addMovementMap(String name, MultipartFile fileMap, MultipartFile fileYaml) throws IOException {
        Binary binaryMapImage = new Binary(BsonBinarySubType.BINARY, fileMap.getBytes());
        Binary binaryYaml = new Binary(BsonBinarySubType.BINARY, fileYaml.getBytes());
        MovementMap movementMap = new MovementMap(name, binaryMapImage, binaryYaml);
        movementMap = movementMapRepository.save(movementMap);
        return movementMap;
    }

//    public String addMovementMapRaw(String name, MultipartFile file) throws IOException {
//        Binary binaryMapImage = new Binary(BsonBinarySubType.BINARY, file.getBytes());
//        MovementMap movementMap = new MovementMap(name, binaryMapImage, null);
//        movementMap = repository.save(movementMap);
//        return movementMap.getId();
//    }

    @Override
    public MovementMap addOne(MovementMap movementMap) {
        return movementMapRepository.save(movementMap);
    }

    @Override
    public MovementMap getOne(String id) {
        return movementMapRepository.findById(id).orElse(null);
    }

    @Override
    public List<MovementMap> getAll() {
        return movementMapRepository.findAll();
    }

    @Override
    public MovementMap updateOne(MovementMap movementMap) {
        List<MapArea> areaList = mapAreaService.getAreasByMap(this.getOne(movementMap.getId()));
        List<Route> routeList = routeService.getByMap(this.getOne(movementMap.getId()));
        for (MapArea area : areaList) {
            area.setMap(movementMap);
            mapAreaService.updateOne(area);
        }
        for (Route route : routeList) {
            route.setMap(movementMap);
            routeService.updateOne(route);
        }
        return movementMapRepository.save(movementMap);
    }

    @Override
    public void deleteOne(MovementMap movementMap) {
        List<Route> routeList = routeService.getByMap(this.getOne(movementMap.getId()));
        for (Route route : routeList) {
            routeService.deleteOne(route);
        }
        movementMapRepository.delete(movementMap);
    }
}

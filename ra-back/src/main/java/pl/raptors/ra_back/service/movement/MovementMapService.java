package pl.raptors.ra_back.service.movement;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.raptors.ra_back.domain.movement.MapArea;
import pl.raptors.ra_back.domain.movement.MovementMap;
import pl.raptors.ra_back.domain.movement.MovementMapData;
import pl.raptors.ra_back.domain.movement.Route;
import pl.raptors.ra_back.repository.movement.MovementMapRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.io.IOException;
import java.util.List;
import java.util.ArrayList;

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
            route.setMapId(movementMap.getId());
            routeService.updateOne(route);
        }
        return movementMapRepository.save(movementMap);
    }

    @Override
    public void deleteOne(MovementMap movementMap) {
        List<Route> routeList = routeService.getByMap(this.getOne(movementMap.getId()));
        routeService.deleteAll(routeList);
        List<MapArea> areaList = mapAreaService.getAreasByMap(this.getOne(movementMap.getId()));
        mapAreaService.deleteAll(areaList);
        movementMapRepository.delete(movementMap);
    }

    @Override
    public void deleteAll(List<MovementMap> movementMapList) {
        for (MovementMap movementMap : movementMapList) {
            this.deleteOne(movementMap);
        }
    }

    public List<MovementMapData> getList() {
        List<MovementMap> mapList =  movementMapRepository.findAll();
        List<MovementMapData> mapDataList = new ArrayList<MovementMapData>();
        for (MovementMap map : mapList) {
            // MovementMapData mapData = new MovementMapData();
            mapDataList.add(new MovementMapData(map.getName(), map.getId()));
        }
        return mapDataList;
    }
}

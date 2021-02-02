package pl.raptors.ra_back.service.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.movement.MovementPath;
import pl.raptors.ra_back.domain.movement.Pose;
import pl.raptors.ra_back.domain.movement.Stand;
import pl.raptors.ra_back.domain.type.ParkingType;
import pl.raptors.ra_back.domain.type.StandStatus;
import pl.raptors.ra_back.domain.type.StandType;
import pl.raptors.ra_back.domain.settings.MapInfo;
import pl.raptors.ra_back.repository.movement.StandRepository;
import pl.raptors.ra_back.repository.type.StandTypeRepository;
import pl.raptors.ra_back.service.CRUDService;
import pl.raptors.ra_back.service.settings.CurrentMapService;

import java.util.List;
import java.util.Optional;


@Service
public class StandService implements CRUDService<Stand> {

    @Autowired
    StandRepository standrepository;

    @Autowired
    StandTypeRepository standTypeRepository;

    @Autowired
    MovementPathService movementPathService;

    @Autowired
    CurrentMapService currentMapService;

    @Override
    public Stand addOne(Stand stand) {
        if (stand.getMapId() == null) {
            List<MapInfo> currentMap = currentMapService.getAll();
            if (currentMap.size() > 0){
                stand.setMapId(currentMap.get(0).getMapId());
            }
        }
        return standrepository.save(stand);
    }

    @Override
    public Stand getOne(String id) {
        return standrepository.findById(id).orElse(null);
    }

    @Override
    public List<Stand> getAll() {
        return standrepository.findAll();
    }

    @Override
    public Stand updateOne(Stand stand) {
        if (stand.getMapId() == null) {
            List<MapInfo> currentMap = currentMapService.getAll();
            if (currentMap.size() > 0){
                stand.setMapId(currentMap.get(0).getMapId());
            }
        }

        String standId=stand.getId();
        List<MovementPath> movementPaths=movementPathService.getAll();
        for (MovementPath path:movementPaths) {
            if(path.getStartStandId().equals(standId)){
                path.getPoints().get(0).setX(stand.getPose().getPosition().getX());
                path.getPoints().get(0).setY(stand.getPose().getPosition().getY());
                movementPathService.updateOne(path);
            }
            if(path.getFinishStandId().equals(standId)){
                path.getPoints().get(path.getPoints().size()-1).setX(stand.getPose().getPosition().getX());
                path.getPoints().get(path.getPoints().size()-1).setY(stand.getPose().getPosition().getY());
                movementPathService.updateOne(path);
            }
        }

        return standrepository.save(stand);
    }

    @Override
    public void deleteOne(Stand stand) {
        String standId=stand.getId();
        standrepository.delete(stand);

        List<MovementPath> movementPaths=movementPathService.getAll();
        for (MovementPath path:movementPaths) {//set null for MovementPaths that had this stand
            if(path.getStartStandId().equals(standId)){
                path.setStartStandId(null);
                movementPathService.updateOne(path);
            }
            if(path.getFinishStandId().equals(standId)){
                path.setFinishStandId(null);
                movementPathService.updateOne(path);
            }
        }
    }

    @Override
    public void deleteAll(List<Stand> standList) {
        for (Stand stand : standList) {
            this.deleteOne(stand);
        }
    }

    public void deleteByID(String id) {
        Optional<Stand> standDB = standrepository.findById(id);
        Stand stand = standDB.get();
        standrepository.delete(stand);
    }

    List<Stand> getByPose(Pose pose) {
        return standrepository.findAllByPose(pose);
    }

    public List<Stand> getByParkingType(ParkingType parkingType) {
        return standrepository.findAllByParkingType(parkingType);
    }

    public List<Stand> getByStandType(StandType standType) {
        return standrepository.findAllByStandType(standType);
    }

    public List<Stand> getByStandTypeName(String standTypeName) {
        StandType standType = standTypeRepository.findByName(standTypeName);
        return standrepository.findAllByStandType(standType);
    }

    public List<Stand> getByStandStatus(StandStatus standStatus) {
        return standrepository.findAllByStandStatus(standStatus);
    }

    public List<Stand> getByMapId(String mapId) {
        return standrepository.findAllByMapId(mapId);
    }
}

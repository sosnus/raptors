package pl.raptors.raptorsRobotsApp.service.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.Stand;
import pl.raptors.raptorsRobotsApp.domain.type.ParkingType;
import pl.raptors.raptorsRobotsApp.repository.movement.StandRepository;
import pl.raptors.raptorsRobotsApp.repository.type.ParkingTypeRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;
import pl.raptors.raptorsRobotsApp.service.movement.StandService;

import java.util.List;
import java.util.Objects;

@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@Service
public class ParkingTypeService implements CRUDService<ParkingType> {

    @Autowired
    ParkingTypeRepository parkingTypeRepository;
    @Autowired
    StandService standService;
    @Autowired
    StandRepository standRepository;

    @Override
    public ParkingType addOne(ParkingType parkingType) {
        ParkingType parkingTypeAlreadyExists = parkingTypeRepository.findByName(parkingType.getName());
        if (Objects.isNull((parkingTypeAlreadyExists))) {
            parkingTypeRepository.save(parkingType);
            return parkingType;
        }
        return parkingTypeAlreadyExists;
    }

    @Override
    public ParkingType getOne(String id) {
        return parkingTypeRepository.findById(id).orElse(null);
    }

    @Override
    public List<ParkingType> getAll() {
        return parkingTypeRepository.findAll();
    }

    @Override
    public ParkingType updateOne(ParkingType parkingType) {
        List<Stand> standList = standService.getByParkingType(this.getOne(parkingType.getId()));
        for (Stand stand : standList) {
            stand.setParkingType(parkingType);
            standService.updateOne(stand);
        }
        return parkingTypeRepository.save(parkingType);
    }

    @Override
    public void deleteOne(ParkingType parkingType) {
        ParkingType parkingTypeToDelete = parkingTypeRepository.findByName(parkingType.getName());
        if (!Objects.isNull((parkingTypeToDelete))) {
            List<Stand> standList = standService.getByParkingType(this.getOne(parkingType.getId()));
            standService.deleteAll(standList);
            parkingTypeRepository.delete(parkingTypeToDelete);
        }
    }

    @Override
    public void deleteAll(List<ParkingType> parkingTypeList) {
        for (ParkingType parkingType : parkingTypeList) {
            this.deleteOne(parkingType);
        }
    }
}

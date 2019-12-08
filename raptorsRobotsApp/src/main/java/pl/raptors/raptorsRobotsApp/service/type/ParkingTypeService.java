package pl.raptors.raptorsRobotsApp.service.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.type.ParkingType;
import pl.raptors.raptorsRobotsApp.repository.type.ParkingTypeRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;
import java.util.Objects;

@Service
public class ParkingTypeService implements CRUDService<ParkingType> {

    @Autowired
    ParkingTypeRepository parkingTypeRepository;

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
        return parkingTypeRepository.save(parkingType);
    }

    @Override
    public void deleteOne(ParkingType parkingType) {
        ParkingType parkingTypeToDelete = parkingTypeRepository.findByName(parkingType.getName());
        if (!Objects.isNull((parkingTypeToDelete))) {
            parkingTypeRepository.delete(parkingTypeToDelete);
        }
    }
}

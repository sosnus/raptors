package pl.raptors.ra_back.repository.movement;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.movement.Pose;
import pl.raptors.ra_back.domain.movement.Stand;
import pl.raptors.ra_back.domain.type.ParkingType;
import pl.raptors.ra_back.domain.type.StandStatus;
import pl.raptors.ra_back.domain.type.StandType;

import java.util.List;

@Repository
public interface StandRepository extends MongoRepository<Stand, String> {

    List<Stand> findAllByPose(Pose pose);

    List<Stand> findAllByParkingType(ParkingType parkingType);

    List<Stand> findAllByStandType(StandType standType);

    List<Stand> findAllByStandStatus(StandStatus standStatus);
}

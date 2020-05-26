package pl.raptors.raptorsRobotsApp.repository.movement;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.movement.Pose;
import pl.raptors.raptorsRobotsApp.domain.movement.Stand;
import pl.raptors.raptorsRobotsApp.domain.type.ParkingType;
import pl.raptors.raptorsRobotsApp.domain.type.StandStatus;
import pl.raptors.raptorsRobotsApp.domain.type.StandType;

import java.util.List;

@Repository
public interface StandRepository extends MongoRepository<Stand, String> {

    List<Stand> findAllByPose(Pose pose);

    List<Stand> findAllByParkingType(ParkingType parkingType);

    List<Stand> findAllByStandType(StandType standType);

    List<Stand> findAllByStandStatus(StandStatus standStatus);
}

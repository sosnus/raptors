package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.raptorsRobotsApp.domain.type.ParkingType;
import pl.raptors.raptorsRobotsApp.domain.type.StandStatus;
import pl.raptors.raptorsRobotsApp.domain.type.StandType;

@NoArgsConstructor
@Data
@Document(collection = "stands")
public class Stand {

    @Id
    private String id;
    private String name;
    private Pose pose;
    private ParkingType parkingType;
    private StandType standType;

    public Stand(String name, Pose pose, ParkingType parkingType, StandType standType) {
        this.name = name;
        this.pose = pose;
        this.parkingType = parkingType;
        this.standType = standType;
    }
}

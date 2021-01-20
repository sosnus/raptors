package pl.raptors.ra_back.domain.movement;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.ra_back.domain.type.ParkingType;
import pl.raptors.ra_back.domain.type.StandStatus;
import pl.raptors.ra_back.domain.type.StandType;

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
    private StandStatus standStatus;
    private String mapId;

    public Stand(String name, Pose pose, ParkingType parkingType, StandType standType, StandStatus standStatus, String mapId) {
        this.name = name;
        this.pose = pose;
        this.parkingType = parkingType;
        this.standType = standType;
        this.standStatus = standStatus;
        this.mapId = mapId;
    }
}

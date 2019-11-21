package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.raptorsRobotsApp.domain.enums.ParkingType;
import pl.raptors.raptorsRobotsApp.domain.enums.StandStatus;
import pl.raptors.raptorsRobotsApp.domain.enums.StandType;

@Getter
@Setter
@Document(collection = "stands")
public class Stand {

    @Id
    private String id;
    private String name;
    private Double xStandCoordinate;
    private Double yStandCoordinate;
    private Double zStandCoordinate;
    private Double xQuaternionCoordinate;
    private Double yQuaternionCoordinate;
    private Double zQuaternionCoordinate;
    private Double wQuaternionCoordinate;
    private StandStatus status;
    private ParkingType parkingType;
    private StandType standType;

    public Stand(String name, Double xStandCoordinate, Double yStandCoordinate, Double zStandCoordinate, Double xQuaternionCoordinate, Double yQuaternionCoordinate, Double zQuaternionCoordinate, Double wQuaternionCoordinate, StandStatus status, ParkingType parkingType, StandType standType)
    {
        this.name = name;
        this.xStandCoordinate = xStandCoordinate;
        this.yStandCoordinate = yStandCoordinate;
        this.zStandCoordinate = zStandCoordinate;
        this.xQuaternionCoordinate = xQuaternionCoordinate;
        this.yQuaternionCoordinate = yQuaternionCoordinate;
        this.zQuaternionCoordinate = zQuaternionCoordinate;
        this.wQuaternionCoordinate = wQuaternionCoordinate;
        this.status = status;
        this.parkingType = parkingType;
        this.standType = standType;
    }
}

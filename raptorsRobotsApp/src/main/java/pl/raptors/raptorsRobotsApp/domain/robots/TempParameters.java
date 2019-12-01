package pl.raptors.raptorsRobotsApp.domain.robots;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.raptorsRobotsApp.domain.type.RobotStatus;

@Data
@Document(collection = "temp_parameters")
public class TempParameters {

    @Id
    private String id;
    private String position;
    private Double batteryLevel;
    private RobotStatus status;

    public TempParameters(String position, Double batteryLevel, RobotStatus status) {
        this.position = position;
        this.batteryLevel = batteryLevel;
        this.status = status;
    }

    public TempParameters() {
    }
}

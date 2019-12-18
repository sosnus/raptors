package pl.raptors.raptorsRobotsApp.domain.robots;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.raptorsRobotsApp.domain.movement.Pose;
import pl.raptors.raptorsRobotsApp.domain.type.RobotStatus;

import java.util.Date;
import java.util.List;

@NoArgsConstructor
@Data
@Document(collection = "temp_parameters")
public class TempParameters {

    @Id
    private String id;
    private Pose pose;
    private Double batteryLevel;
    private List<RobotStatus> status;
    private Date date=new Date();


    public TempParameters(Pose pose, Double batteryLevel, List<RobotStatus> status) {
        this.pose = pose;
        this.batteryLevel = batteryLevel;
        this.status = status;
    }
}

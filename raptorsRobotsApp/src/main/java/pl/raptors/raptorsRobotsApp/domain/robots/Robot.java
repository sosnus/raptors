package pl.raptors.raptorsRobotsApp.domain.robots;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.raptorsRobotsApp.domain.movement.Pose;

import java.util.List;

@NoArgsConstructor
@Data
@Document(collection = "robots")
public class Robot {

    @Id
    private String id;
    private String robotIp;
    private Boolean available;
    private ExtraRobotElement extraRobotElement;
    private RobotModel model;
    private RobotBattery battery;
    private Pose pose;
    private Double batteryLevel;
    private List<RobotStatus> status;
    private String timestamp;

    public Robot(String robotIp, Boolean available, ExtraRobotElement extraRobotElement, RobotModel model, Pose pose, String timestamp, Double batteryLevel, List<RobotStatus> status) {
        this.robotIp = robotIp;
        this.available = available;
        this.extraRobotElement = extraRobotElement;
        this.model = model;
        this.pose = pose;
        this.timestamp=timestamp;
        this.batteryLevel = batteryLevel;
        this.status = status;
    }
}

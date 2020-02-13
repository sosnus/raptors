package pl.raptors.raptorsRobotsApp.domain.robots;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.raptorsRobotsApp.domain.movement.Pose;
import pl.raptors.raptorsRobotsApp.domain.type.RobotStatus;

import java.util.List;

@NoArgsConstructor
@Data
@Document(collection = "robots_to_approve")
public class RobotToApprove {

    @Id
    private String id;
    private String robotIp;
    private String password;
    private Boolean available;
    private ExtraRobotElement extraRobotElement;
    private RobotModel model;
    private RobotBattery battery;
    private Pose pose;
    private Double batteryLevel;
    private List<RobotStatus> status;
    private String timestamp;

    public RobotToApprove(String robotIp, String password, Boolean available, ExtraRobotElement extraRobotElement, RobotModel model, Pose pose, String timestamp, Double batteryLevel, List<RobotStatus> status) {
        this.robotIp = robotIp;
        this.password = password;
        this.available = available;
        this.extraRobotElement = extraRobotElement;
        this.model = model;
        this.pose = pose;
        this.timestamp = timestamp;
        this.batteryLevel = batteryLevel;
        this.status = status;
    }
}
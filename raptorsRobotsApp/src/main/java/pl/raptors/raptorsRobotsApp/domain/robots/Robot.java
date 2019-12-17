package pl.raptors.raptorsRobotsApp.domain.robots;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

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
    private TempParameters parameters;
    private RobotBattery battery;

    public Robot(String robotIp, Boolean available, ExtraRobotElement extraRobotElement, RobotModel model, TempParameters parameters) {
        this.robotIp = robotIp;
        this.available = available;
        this.extraRobotElement = extraRobotElement;
        this.model = model;
        this.parameters = parameters;
    }
}

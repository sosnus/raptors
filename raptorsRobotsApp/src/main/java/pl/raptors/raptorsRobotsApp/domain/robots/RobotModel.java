package pl.raptors.raptorsRobotsApp.domain.robots;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.raptorsRobotsApp.domain.enums.PropulsionType;

@Getter
@Setter
@Document(collection = "robot_models")
public class RobotModel {

    @Id
    private String id;
    private String name;
    private String maxLiftingCapacity;
    private String maxVelocity;
    private String length;
    private String width;
    private String height;
    private String turningRadius;
    private PropulsionType propulsionType;
}

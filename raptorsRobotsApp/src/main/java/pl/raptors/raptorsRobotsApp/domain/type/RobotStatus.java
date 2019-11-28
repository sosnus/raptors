package pl.raptors.raptorsRobotsApp.domain.type;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "robot_statuses")
public class RobotStatus {
    @Id
    private String id;
    private String name;

    public RobotStatus(String name) {
        this.name = name;
    }
}

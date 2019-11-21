package pl.raptors.raptorsRobotsApp.domain.robots;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "extra_robot_elements")
public class ExtraRobotElement {

    @Id
    private String id;
    private String name;
    private String dimensions;
    private String functionality;
}

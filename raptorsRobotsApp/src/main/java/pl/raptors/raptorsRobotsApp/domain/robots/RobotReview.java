package pl.raptors.raptorsRobotsApp.domain.robots;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.raptorsRobotsApp.domain.enums.ReviewType;

import java.util.Date;

@Getter
@Setter
@Document(collection = "robot_reviews")
public class RobotReview {

    @Id
    private String id;
    private Robot robot;
    private Date plannedDate;
    private Date realizationDate;
    private ReviewType reviewType;
}

package pl.raptors.raptorsRobotsApp.domain.robots;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.raptorsRobotsApp.domain.type.ReviewType;

@NoArgsConstructor
@Data
@Document(collection = "robot_reviews")
public class RobotReview {

    @Id
    private String id;
    private Robot robot;
    private String plannedDate;
    private String realizationDate;
    private ReviewType reviewType;

    public RobotReview(Robot robot, String plannedDate, String realizationDate, ReviewType reviewType) {
        this.robot = robot;
        this.plannedDate = plannedDate;
        this.realizationDate = realizationDate;
        this.reviewType = reviewType;
    }
}

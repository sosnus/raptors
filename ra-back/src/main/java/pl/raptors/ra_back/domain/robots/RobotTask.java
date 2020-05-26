package pl.raptors.ra_back.domain.robots;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.ra_back.domain.type.TaskPriority;

import java.util.List;

@NoArgsConstructor
@Data
@Document(collection = "robot_tasks")
public class RobotTask {

    @Id
    private String id;
    private Robot robot;
    private String name;
    private List<Behaviour> behaviours;
    private String startTime;
    private TaskPriority priority;
    private StatusType status;
    private String userID;

    public RobotTask(Robot robot, String name, List<Behaviour> behaviours, String startTime, TaskPriority priority, StatusType status, String userID) {
        this.robot = robot;
        this.name = name;
        this.behaviours = behaviours;
        this.startTime = startTime;
        this.priority = priority;
        this.status = status;
        this.userID = userID;
    }
}

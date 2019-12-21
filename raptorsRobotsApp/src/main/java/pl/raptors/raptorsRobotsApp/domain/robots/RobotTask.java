package pl.raptors.raptorsRobotsApp.domain.robots;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.raptorsRobotsApp.domain.type.TaskPriority;

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
    private  String status;

    public RobotTask(Robot robot, String name, List<Behaviour> behaviours, String startTime, TaskPriority priority, String status) {
        this.robot = robot;
        this.name = name;
        this.behaviours = behaviours;
        this.startTime = startTime;
        this.priority = priority;
        this.status = status;
    }
}

package pl.raptors.raptorsRobotsApp.domain.robots;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.raptorsRobotsApp.domain.enums.TaskPriority;

import java.util.Date;
import java.util.List;

@Data
@Document(collection = "robot_tasks")
public class RobotTask {

    @Id
    private String id;
    private String name;
    private List<Behaviour> behaviours;
    //private Date startTime; //zamiana dla łatwiejszej implementacji przykłądowych danych
    private String startTime;
    private TaskPriority priority;

    public RobotTask(String name, List<Behaviour> behaviours, String startTime, TaskPriority priority) {
        this.name = name;
        this.behaviours = behaviours;
        this.startTime = startTime;
        this.priority = priority;
    }
}

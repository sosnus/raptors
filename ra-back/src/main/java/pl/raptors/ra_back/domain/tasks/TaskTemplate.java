package pl.raptors.ra_back.domain.tasks;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.ra_back.domain.type.TaskPriority;
import pl.raptors.ra_back.domain.robots.Behaviour;

import java.util.List;

@NoArgsConstructor
@Data
@Document(collection = "tasks_templates")
public class TaskTemplate {

    @Id
    private String id;
    private String name;
    private List<Behaviour> behaviours;
    private TaskPriority priority;
    private String kioskId;

    public TaskTemplate(String name, List<Behaviour> behaviours, TaskPriority priority, String kioskId) {
        this.name = name;
        this.behaviours = behaviours;
        this.priority = priority;
        this.kioskId = kioskId;
    }
}

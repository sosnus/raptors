package pl.raptors.ra_back.domain.type;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "task_priorities")
public class TaskPriority {
    @Id
    private String id;
    private String name;
//    @Indexed(unique = true)
    private Integer weight;

    public TaskPriority(String name, Integer weight) {
        this.name = name;
        this.weight = weight;
    }
}

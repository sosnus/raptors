package pl.raptors.raptorsRobotsApp.domain.type;

import lombok.Data;
import org.hibernate.validator.constraints.UniqueElements;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "route_priorities")
public class RoutePriority {
    @Id
    private String id;
    private String name;
    @Indexed(unique=true)
    private Integer weight;

    public RoutePriority(String name, Integer weight) {
        this.name = name;
        this.weight = weight;
    }

    public RoutePriority() {
    }
}

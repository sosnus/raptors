package pl.raptors.raptorsRobotsApp.domain.type;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "propulsion_types")
public class PropulsionType {
    @Id
    private String id;
    private String name;

    public PropulsionType(String name) {
        this.name = name;
    }
}


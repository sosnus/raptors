package pl.raptors.raptorsRobotsApp.domain.robots;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.raptorsRobotsApp.domain.enums.BehaviourType;

@Data
@Document(collection = "behaviours")
public class Behaviour {

    @Id
    private String id;
    private BehaviourType type;
    private String parameters;//will be json

    public Behaviour(BehaviourType type, String parameters) {
        this.type = type;
        this.parameters = parameters;
    }
}

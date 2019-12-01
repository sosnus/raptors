package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "corridors")
public class Corridor {

    @Id
    private String id;
    private String name;
    private MovementPath movementPath;

    public Corridor(String name, MovementPath movementPath)
    {
        this.name = name;
        this.movementPath = movementPath;
    }

    public Corridor() {
    }
}

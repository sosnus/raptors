package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@NoArgsConstructor
@Data
@Document(collection = "corridors")
public class Corridor {

    @Id
    private String id;
    private String name;
    private String movementPathId;//can be empty
    private List<UniversalPoint> points;

    public Corridor(String name, String movementPathId, List<UniversalPoint> points) {
        this.name = name;
        this.movementPathId = movementPathId;
        this.points = points;
    }
}

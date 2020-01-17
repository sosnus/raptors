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
    private String movementPathId;//moze zostac puste
    private List<String> corridorPointsIds;

    public Corridor(String name, String movementPathId, List<String> corridorPointsIds) {
        this.name = name;
        this.movementPathId = movementPathId;
        this.corridorPointsIds = corridorPointsIds;
    }
}

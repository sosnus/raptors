package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@NoArgsConstructor
@Data
@Document(collection = "movement_paths")
public class MovementPath {

    @Id
    private String id;
    private String name;
    private List<String> movementPathPointsIds;


    public MovementPath(String name, List<String> movementPathPointsIds) {
        this.name = name;
        this.movementPathPointsIds = movementPathPointsIds;
    }
}

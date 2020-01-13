package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "movement_path_points")
public class MovementPathPoint {

    @Id
    private String id;
    private String movementPathId;
    private Integer polygonVertexNumber;
    private UniversalPoint coordinates;

    public MovementPathPoint(String movementPathId, Integer polygonVertexNumber, UniversalPoint coordinates) {
        this.movementPathId = movementPathId;
        this.polygonVertexNumber = polygonVertexNumber;
        this.coordinates = coordinates;
    }
}

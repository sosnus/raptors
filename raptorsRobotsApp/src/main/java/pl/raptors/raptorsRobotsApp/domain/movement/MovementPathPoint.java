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
    private MovementPath path;
    private Integer polygonVertexNumber;
    private Double xCoordinate;
    private Double yCoordinate;

    public MovementPathPoint(MovementPath path, Integer polygonVertexNumber, Double xCoordinate, Double yCoordinate) {
        this.path = path;
        this.polygonVertexNumber = polygonVertexNumber;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
    }
}

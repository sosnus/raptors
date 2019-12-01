package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "path_points")
public class PathPoint {

    @Id
    private String id;
    private MovementPath path;
    private Integer polygonVertexNumber;
    private Double xCoordinate;
    private Double yCoordinate;

    public PathPoint(MovementPath path, Integer polygonVertexNumber, Double xCoordinate, Double yCoordinate) {
        this.path = path;
        this.polygonVertexNumber = polygonVertexNumber;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
    }

    public PathPoint() {
    }
}

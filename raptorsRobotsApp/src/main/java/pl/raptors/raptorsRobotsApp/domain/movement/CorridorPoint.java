package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "corridor_points")
public class CorridorPoint {

    @Id
    private String id;
    private Corridor corridor;
    private Integer polygonVertexNumber;
    private Double xCoordinate;
    private Double yCoordinate;

}

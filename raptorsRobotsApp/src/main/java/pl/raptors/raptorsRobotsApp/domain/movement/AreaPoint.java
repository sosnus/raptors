package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "area_points")
public class AreaPoint {

    @Id
    private String id;
    private MapArea mapArea;
    private Integer polygonVertexNumber;
    private Double xCoordinate;
    private Double yCoordinate;
}

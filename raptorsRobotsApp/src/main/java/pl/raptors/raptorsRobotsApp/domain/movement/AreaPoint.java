package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "area_points")
public class AreaPoint {

    @Id
    private String id;
    private MapArea mapArea;
    private Integer polygonVertexNumber;
    private Double xCoordinate;
    private Double yCoordinate;


    public AreaPoint(MapArea mapArea, Integer polygonVertexNumber, Double xCoordinate, Double yCoordinate)
    {
        this.mapArea = mapArea;
        this.polygonVertexNumber = polygonVertexNumber;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
    }
}

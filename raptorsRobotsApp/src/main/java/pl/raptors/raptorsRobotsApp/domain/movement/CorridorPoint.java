package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "corridor_points")
public class CorridorPoint {

    @Id
    private String id;
    private String corridorId;
    private Integer polygonVertexNumber;
    private UniversalPoint coordinates;

    public CorridorPoint(String corridorId, Integer polygonVertexNumber, UniversalPoint coordinates) {
        this.corridorId = corridorId;
        this.polygonVertexNumber = polygonVertexNumber;
        this.coordinates = coordinates;
    }
}

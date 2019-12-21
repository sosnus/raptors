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
    private Corridor corridor;
    private Integer polygonVertexNumber;
    private Double xCoordinate;
    private Double yCoordinate;

    public CorridorPoint(Corridor corridor, Integer polygonVertexNumber, Double xCoordinate, Double yCoordinate) {
        this.corridor = corridor;
        this.polygonVertexNumber = polygonVertexNumber;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
    }
}

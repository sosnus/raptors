package pl.raptors.raptorsRobotsApp.domain.movement;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter @Setter
@Document(collection = "movement_paths")
public class MovementPath {

    @Id
    private String id;
    private String name;
    private Double xCoordinate;
    private Double yCoordinate;

    public MovementPath(String name, Double xCoordinate, Double yCoordinate)
    {
        this.name = name;
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
    }
}

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
    private List<UniversalPoint> points;


    public MovementPath(String name, List<UniversalPoint> points) {
        this.name = name;
        this.points = points;
    }
}

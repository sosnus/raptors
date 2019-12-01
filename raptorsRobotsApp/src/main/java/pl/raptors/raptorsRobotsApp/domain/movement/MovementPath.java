package pl.raptors.raptorsRobotsApp.domain.movement;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "movement_paths")
public class MovementPath {

    @Id
    private String id;
    private String name;

    public MovementPath(String name) {
        this.name = name;
    }

    public MovementPath() {
    }
}

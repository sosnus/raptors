package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "movement_paths")
public class MovementPath {

    @Id
    private String id;
    private String name;

    public MovementPath(String name) {
        this.name = name;
    }
}
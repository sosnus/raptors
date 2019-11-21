package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.raptorsRobotsApp.domain.enums.RoutePriority;

@Data
@Document(collection = "routes")
public class Route {

    @Id
    private String id;
    private MovementMap map;
    private MovementPath path;
    private Corridor corridor;
    private String name;
    private Stand start;
    private Stand end;
    private RoutePriority priority;

    public Route(MovementMap map, MovementPath path, Corridor corridor, String name, Stand start, Stand end, RoutePriority priority) {
        this.map = map;
        this.path = path;
        this.corridor = corridor;
        this.name = name;
        this.start = start;
        this.end = end;
        this.priority = priority;
    }
}

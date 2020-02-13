package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.raptorsRobotsApp.domain.type.RoutePriority;

@NoArgsConstructor
@Data
@Document(collection = "routes")
public class Route {

    @Id
    private String id;
    private String mapId;
    private String movementPathId;
    private String corridorId;
    private String name;
    private Stand start;
    private Stand end;
    private String priorityId;

    public Route(String mapId, String movementPathId, String corridorId, String name, Stand start, Stand end, String priorityId) {
        this.mapId = mapId;
        this.movementPathId = movementPathId;
        this.corridorId = corridorId;
        this.name = name;
        this.start = start;
        this.end = end;
        this.priorityId = priorityId;
    }
}

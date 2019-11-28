package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.raptorsRobotsApp.domain.type.AreaType;

@Data
@Document(collection = "map_areas")
public class MapArea {

    @Id
    private String id;
    private String name;
    private MovementMap map;
    private AreaType type;

    public MapArea(String name, MovementMap map, AreaType type)
    {
        this.name = name;
        this.map = map;
        this.type = type;
    }
}

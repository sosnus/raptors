package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.raptorsRobotsApp.domain.type.AreaType;

import java.util.List;

@NoArgsConstructor
@Data
@Document(collection = "map_areas")
public class MapArea {

    @Id
    private String id;
    private String name;
    private AreaType type;
    private List<UniversalPoint> points;

    public MapArea(String name, AreaType type, List<UniversalPoint> points)
    {
        this.name = name;
        this.type = type;
        this.points = points;
    }
}

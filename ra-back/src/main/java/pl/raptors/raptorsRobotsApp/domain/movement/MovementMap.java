package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Data;
import org.bson.types.Binary;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "movement_maps")
public class MovementMap {
    @Id
    private String id;
    private String name;
    private Binary mapImage;
    private Binary yamlFile;

    public MovementMap(String name, Binary mapImage, Binary yamlFile) {
        this.name = name;
        this.mapImage = mapImage;
        this.yamlFile = yamlFile;
    }
}

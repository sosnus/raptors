package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "movement_maps")
public class MovementMap {
    @Id
    private String id;
    private String name;
    private String pgmFilePath;
    private String yamlFilePath;

    public MovementMap(String name, String pgmFilePath, String yamlFilePath)
    {
        this.name = name;
        this.pgmFilePath = pgmFilePath;
        this.yamlFilePath = yamlFilePath;
    }

    public MovementMap() {
    }
}

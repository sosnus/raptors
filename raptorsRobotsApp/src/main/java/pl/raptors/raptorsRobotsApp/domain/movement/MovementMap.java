package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter @Setter
@Document(collection = "movement_maps")
public class MovementMap {
    @Id
    private String id;
    private String name;
    private String pgmFilePath;
    private String yamlFilePath;

}

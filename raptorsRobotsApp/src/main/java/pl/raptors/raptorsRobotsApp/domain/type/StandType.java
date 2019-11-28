package pl.raptors.raptorsRobotsApp.domain.type;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Data
@Document(collection = "stand_types")
public class StandType {
    @Id
    private String id;
    private String name;

    public StandType(String name) {
        this.name = name;
    }
}



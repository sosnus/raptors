package pl.raptors.ra_back.domain.movement;

import lombok.Data;
import org.bson.types.Binary;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
public class MovementMapData {

    private String id;
    private String name;

    public MovementMapData(String name, String id) {
        this.name = name;
        this.id = id;
    }
}
package pl.raptors.raptorsRobotsApp.domain.type;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "area_types")
public class AreaType {
    @Id
    private String id;
    private String name;

    public AreaType(String name) {
        this.name = name;
    }
}


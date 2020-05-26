package pl.raptors.ra_back.domain.settings;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "currentMap")
public class CurrentMap {

    @Id
    private String CurrentMapId;
    private Double mapResolutionX;
    private Double mapResolutionY;
    private Integer imageResolutionX;
    private Integer imageResolutionY;
}

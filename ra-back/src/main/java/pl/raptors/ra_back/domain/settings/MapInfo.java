package pl.raptors.ra_back.domain.settings;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "currentMap")
public class MapInfo {

    @Id
    private String Id = "default";
    private String mapId;
    private Double mapResolutionX;
    private Double mapResolutionY;
    private Integer imageResolutionX;
    private Integer imageResolutionY;
    private Double mapOriginX;
    private Double mapOriginY;

    public MapInfo(String mapId, Double mapResolutionX, Double mapResolutionY,
                      Integer imageResolutionX,  Integer imageResolutionY,
                      Double mapOriginX, Double mapOriginY) {
        this.mapId = mapId;
        this.mapResolutionX = mapResolutionX;
        this.mapResolutionY = mapResolutionY;
        this.imageResolutionX = imageResolutionX;
        this.imageResolutionY = imageResolutionY;
        this.mapOriginX = mapOriginX;
        this.mapOriginY = mapOriginY;
    }
}

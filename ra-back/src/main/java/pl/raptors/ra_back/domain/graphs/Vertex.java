package pl.raptors.ra_back.domain.graphs;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "vertices")
public class Vertex {

    @Id
    private String id;
    private Double posX;
    private Double posY;
    private String name;
    private String poiID;
    private Integer type;

    public Vertex(Double posX, Double posY, String name, String poiID, Integer type) {
        this.posX = posX;
        this.posY = posY;
        this.name = name;
        this.poiID = poiID;
        this.type = type;
    }
}

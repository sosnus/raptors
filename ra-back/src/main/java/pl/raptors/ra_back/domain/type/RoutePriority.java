package pl.raptors.ra_back.domain.type;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "route_priorities")
public class RoutePriority {
    @Id
    private String id;
    private String name;
    private Integer weight;

    public RoutePriority(String name, Integer weight) {
        this.name = name;
        this.weight = weight;
    }
}

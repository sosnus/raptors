package pl.raptors.ra_back.domain.robots;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "behaviours")
public class Behaviour {

    @Id
    private String id;
    private String name;
    private String parameters;//will be json

    public Behaviour(String name, String parameters) {
        this.name = name;
        this.parameters = parameters;
    }
}

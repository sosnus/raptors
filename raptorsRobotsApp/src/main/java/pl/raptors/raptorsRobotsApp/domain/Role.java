package pl.raptors.raptorsRobotsApp.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "roles")
public class Role {

    @Id
    private String id;
    private String name;

    public Role(String name) {
        this.name = name;
    }
}

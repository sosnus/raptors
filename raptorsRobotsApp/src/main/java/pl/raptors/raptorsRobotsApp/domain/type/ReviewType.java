package pl.raptors.raptorsRobotsApp.domain.type;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "review_types")
public class ReviewType {
    @Id
    private String id;
    private String name;

    public ReviewType(String name) {
        this.name = name;
    }

    public ReviewType() {
    }
}


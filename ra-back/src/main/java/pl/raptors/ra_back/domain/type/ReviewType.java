package pl.raptors.ra_back.domain.type;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "review_types")
public class ReviewType {
    @Id
    private String id;
    private String name;

    public ReviewType(String name) { this.name = name; }
}


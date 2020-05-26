package pl.raptors.ra_back.domain.robots;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "element_functionality")
public class ElementFunctionality {

    @Id
    private String id;
    private String name;

    public ElementFunctionality(String name) {
        this.name = name;
    }
}

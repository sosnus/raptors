package pl.raptors.raptorsRobotsApp.domain.robots;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "extra_robot_elements_functionality")
public class ElementFunctionality {

    @Id
    private String id;
    private String name;

    public ElementFunctionality(String name) {
        this.name = name;
    }

    public ElementFunctionality() {
    }
}

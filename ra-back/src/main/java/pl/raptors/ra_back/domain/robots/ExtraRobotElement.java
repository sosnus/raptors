package pl.raptors.ra_back.domain.robots;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@NoArgsConstructor
@Data
@Document(collection = "extra_robot_elements")
public class ExtraRobotElement {

    @Id
    private String id;
    private String name;
    private String dimensions;
    private List<ElementFunctionality> functionalityList;

    public ExtraRobotElement(String name, String dimensions, List<ElementFunctionality> functionalityList) {
        this.name = name;
        this.dimensions = dimensions;
        this.functionalityList = functionalityList;
    }


    public ExtraRobotElement(String name, String dimensions)
    {
        this.name = name;
        this.dimensions = dimensions;
    }
}

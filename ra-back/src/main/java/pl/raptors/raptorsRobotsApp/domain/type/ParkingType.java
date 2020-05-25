package pl.raptors.raptorsRobotsApp.domain.type;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "parking_types")
public class ParkingType {
    @Id
    private String id;
    private String name;

    public ParkingType(String name) {
        this.name = name;
    }
}



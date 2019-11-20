package pl.raptors.raptorsRobotsApp.domain.robots;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "battery_types")
public class BatteryType {

    @Id
    private String id;
    private String name;
    private String capacity;
    private String ratedVoltage;
    private String maxCurrent;
}

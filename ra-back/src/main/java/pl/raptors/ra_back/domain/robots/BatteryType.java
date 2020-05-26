package pl.raptors.ra_back.domain.robots;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "battery_types")
public class BatteryType {

    @Id
    private String id;
    private String name;
    private String capacity;
    private String ratedVoltage;
    private String maxCurrent;

    public BatteryType(String name, String capacity, String ratedVoltage, String maxCurrent) {
        this.name = name;
        this.capacity = capacity;
        this.ratedVoltage = ratedVoltage;
        this.maxCurrent = maxCurrent;
    }
}

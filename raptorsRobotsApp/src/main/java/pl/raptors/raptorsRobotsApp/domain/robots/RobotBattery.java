package pl.raptors.raptorsRobotsApp.domain.robots;

import lombok.Data;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "batteries")
public class RobotBattery {

    @Id
    private String id;
    //private Date productionDate;
    private String productionDate; //na potrzeby przykładowych danych zmieniam na stringa todo
    private BatteryType type;

    public RobotBattery(String productionDate, BatteryType type)
    {
        this.productionDate = productionDate;
        this.type = type;
    }
}

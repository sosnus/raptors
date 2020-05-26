package pl.raptors.ra_back.domain.robots;

import lombok.Data;

import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "batteries")
public class RobotBattery {

    @Id
    private String id;
    //private Date productionDate;
    private String productionDate; //w stringu będzie to zapisywane ze wględu na możliwość czytelniejszego przechoywywania i formatowania daty
    private BatteryType type;

    public RobotBattery(String productionDate, BatteryType type)
    {
        this.productionDate = productionDate;
        this.type = type;
    }
}

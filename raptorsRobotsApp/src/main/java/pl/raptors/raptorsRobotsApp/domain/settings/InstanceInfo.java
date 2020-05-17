package pl.raptors.raptorsRobotsApp.domain.settings;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "instanceInfo")
public class InstanceInfo {

    String InstanceName;
    String InstanceDescription;
    String InstanceAddress;
}

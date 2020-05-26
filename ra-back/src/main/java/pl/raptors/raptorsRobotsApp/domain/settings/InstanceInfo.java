package pl.raptors.raptorsRobotsApp.domain.settings;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "instanceInfo")
public class InstanceInfo {
    @Id
    String _id;
    String InstanceName;
    String InstanceDescription;
    String InstanceAddress;
}

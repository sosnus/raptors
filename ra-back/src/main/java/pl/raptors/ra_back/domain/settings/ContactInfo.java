package pl.raptors.ra_back.domain.settings;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Document(collection = "contactInfo")
public class ContactInfo {
    @Id
    private String _id;
    private String Function;
    private String Name;
    private Long Phone;
    private String Mail;

}

package pl.raptors.ra_back.domain.settings;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "contactInfos")
public class ContactInfos {
    ContactInfo contactInfos[];
}

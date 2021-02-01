package pl.raptors.ra_back.domain.kiosk;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "kiosks")
public class Kiosk {
    @Id
    private String id;
    private String name;

    public Kiosk(String name) {
        this.name = name;
    }
}


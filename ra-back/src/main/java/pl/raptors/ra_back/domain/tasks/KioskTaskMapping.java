package pl.raptors.ra_back.domain.tasks;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import pl.raptors.ra_back.domain.type.TaskPriority;

import java.util.List;
import java.util.Map;

@NoArgsConstructor
@Data
@Document(collection = "kiosk_task_mappings")
public class KioskTaskMapping {

    @Id
    private String id;
    private String kioskId;
    private String templateId1;
    private String templateId2;
    private String templateId3;
    private String templateId4;
    private String templateId5;
    private String templateId6;
    private String templateId7;
    private String templateId8;
    private String templateId9;

    public KioskTaskMapping(String kioskId, String templateId1, String templateId2,
                            String templateId3, String templateId4, String templateId5,
                            String templateId6, String templateId7, String templateId8,
                            String templateId9) {
        this.kioskId = kioskId;
        this.templateId1 = templateId1;
        this.templateId2 = templateId2;
        this.templateId3 = templateId3;
        this.templateId4 = templateId4;
        this.templateId5 = templateId5;
        this.templateId6 = templateId6;
        this.templateId7 = templateId7;
        this.templateId8 = templateId8;
        this.templateId9 = templateId9;
    }
}

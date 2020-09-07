package pl.raptors.ra_back.domain.mapsMetadata;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "map_metadata")
public class Maps {
    @Id
    String id;
    String urlYaml;
    String urlPng;
    String urlPgm;
    String[]tags;

    MapMetadata mapMetadata;
    MapTransformation mapTransformation;
    MapRotation mapRotation;

    public Maps(String urlYaml, String urlPng, String urlPgm, String[] tags, MapMetadata mapMetadata, MapTransformation mapTransformation, MapRotation mapRotation) {
        this.urlYaml = urlYaml;
        this.urlPng = urlPng;
        this.urlPgm = urlPgm;
        this.tags = tags;
        this.mapMetadata = mapMetadata;
        this.mapTransformation = mapTransformation;
        this.mapRotation = mapRotation;
    }
}

package pl.raptors.ra_back.domain.mapsMetadata;

import lombok.Data;

@Data
public class MapMetadata {      // na wszelki wypadek dane w stringach aby nie powstały żadne zaokrąglenia związane z konwersją
    String image;
    String resolution;
    String[] origin;
    String negate;
    String occupied_thresh;
    String free_thresh;
}

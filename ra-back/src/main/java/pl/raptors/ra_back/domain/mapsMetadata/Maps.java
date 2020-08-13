package pl.raptors.ra_back.domain.mapsMetadata;

import lombok.Data;

@Data
public class Maps {
    String id;
    String urlYaml;
    String urlPng;
    String urlPgm;
    String[]tags;

    MapMetadata mapMetadata;
    MapTransformation mapTransformation;
    MapRotation mapRotation;
}

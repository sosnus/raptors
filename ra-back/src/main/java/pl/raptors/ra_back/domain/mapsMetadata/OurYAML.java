package pl.raptors.ra_back.domain.mapsMetadata;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Arrays;

@NoArgsConstructor
public class OurYAML {
    @Getter @Setter private String image;
    @Getter @Setter private Double resolution;
    @Getter @Setter private Double[] origin;
    @Getter @Setter private Integer negate;
    @Getter @Setter private Double occupied_thresh;
    @Getter @Setter private Double free_thresh;

    public OurYAML(String image, Double resolution, Double[] origin, Integer negate, Double occupied_thresh, Double free_thresh) {
        this.image = image;
        this.resolution = resolution;
        this.origin = origin;
        this.negate = negate;
        this.occupied_thresh = occupied_thresh;
        this.free_thresh = free_thresh;
    }

    @Override
    public String toString() {
        return "OurYAML{" +
                "image='" + image + '\'' +
                ", resolution=" + resolution +
                ", origin=" + Arrays.toString(origin) +
                ", negate=" + negate +
                ", occupied_thresh=" + occupied_thresh +
                ", free_thresh=" + free_thresh +
                '}';
    }
}

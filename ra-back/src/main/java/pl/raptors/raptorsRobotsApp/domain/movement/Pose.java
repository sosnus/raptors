package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class Pose {

    private UniversalPoint position;
    private Orientation orientation;

    @Data
    @NoArgsConstructor
    public static class Orientation {
        double x;
        double y;
        double z;
        double w;

        public Orientation(double x, double y, double z, double w) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.w = w;
        }
    }
}
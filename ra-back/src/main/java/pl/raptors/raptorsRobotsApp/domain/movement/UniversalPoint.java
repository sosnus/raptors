package pl.raptors.raptorsRobotsApp.domain.movement;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UniversalPoint {
    double x;
    double y;
    double z;

    public UniversalPoint(double x, double y, double z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}
package pl.raptors.raptorsRobotsApp.domain.healthz;

import lombok.Data;

@Data
public class JVMData {
    private String freeMemory;
    private String allocatedMemory;
    private String maxMemory;
    private String totalFreeMemory;

    public JVMData(long freeMemory, long allocatedMemory, long maxMemory, long totalFreeMemory) {
        this.freeMemory = String.valueOf(freeMemory);
        this.allocatedMemory = String.valueOf(allocatedMemory);
        this.maxMemory = String.valueOf(maxMemory);
        this.totalFreeMemory = String.valueOf(totalFreeMemory);
    }
}

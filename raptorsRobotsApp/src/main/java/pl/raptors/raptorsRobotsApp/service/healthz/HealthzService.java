package pl.raptors.raptorsRobotsApp.service.healthz;

import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.healthz.JVMData;

@Service
public class HealthzService {
    public JVMData getData(){
        Runtime runtime = Runtime.getRuntime();
        long maxMemory = runtime.maxMemory();
        long allocatedMemory = runtime.totalMemory();
        long freeMemory = runtime.freeMemory();
        return new JVMData(freeMemory / 1024, allocatedMemory / 1024, maxMemory / 1024, (freeMemory + (maxMemory - allocatedMemory)) / 1024);
    }
}

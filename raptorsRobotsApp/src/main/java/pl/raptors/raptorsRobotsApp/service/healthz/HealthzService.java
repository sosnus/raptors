package pl.raptors.raptorsRobotsApp.service.healthz;

import com.mongodb.ServerAddress;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.healthz.JVMData;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Properties;
import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class HealthzService {

    public JVMData getData() {
        Runtime runtime = Runtime.getRuntime();
        long maxMemory = runtime.maxMemory();
        long allocatedMemory = runtime.totalMemory();
        long freeMemory = runtime.freeMemory();
        return new JVMData(freeMemory / 1024, allocatedMemory / 1024, maxMemory / 1024, (freeMemory + (maxMemory - allocatedMemory)) / 1024);
    }

    public String getDatabaseAddress() {
        Resource resource = new ClassPathResource("/application.properties");
        String databaseAddress = "";
        try {
            Properties props = PropertiesLoaderUtils.loadProperties(resource);
            databaseAddress = props.getProperty("spring.data.mongodb.uri");
            String[] s2 = props.getProperty("spring.data.mongodb.uri").split("/");
            String[] s3 = s2[2].split("@");
            databaseAddress = s3[1];
        } catch (IOException e) {
            e.printStackTrace();
        }
        return databaseAddress;
    }

    public String getDatabaseName() {
        Resource resource = new ClassPathResource("/application.properties");
        String databaseName = "";
        try {
            Properties props = PropertiesLoaderUtils.loadProperties(resource);
            databaseName = props.getProperty("spring.data.mongodb.database");
        } catch (IOException e) {
            e.printStackTrace();
        }
        return databaseName;
    }


}

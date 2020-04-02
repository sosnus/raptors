package pl.raptors.raptorsRobotsApp.controller.healthz;

import org.codehaus.plexus.util.xml.pull.XmlPullParserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.healthz.JVMData;
import pl.raptors.raptorsRobotsApp.service.accounts.RoleService;
import org.apache.maven.model.Model;
import org.apache.maven.model.io.xpp3.MavenXpp3Reader;
import pl.raptors.raptorsRobotsApp.service.healthz.HealthzService;
import java.io.FileReader;
import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/healthz")
public class HealthzController {

    @Autowired
    private RoleService roleService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @GetMapping("/backend")
    public Boolean isBackendWorking() {
        return true;
    }

    //@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @GetMapping("/backend/version")
    public String getBackendVersion() throws IOException, XmlPullParserException {
        MavenXpp3Reader reader = new MavenXpp3Reader();
        Model model = reader.read(new FileReader("pom.xml"));
        return model.getVersion();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @GetMapping("/database")
    public Boolean idDatabaseWorking() {
        try {
            roleService.getAll();
        }
       catch (Exception e){
            return false;
       }
        return true;
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @GetMapping("/jvmMonitor")
    public JVMData jvmData() {
        HealthzService healthzService = new HealthzService();
        return healthzService.getData();
    }

}

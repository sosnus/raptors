package pl.raptors.ra_back.controller.healthz;

import org.codehaus.plexus.util.xml.pull.XmlPullParserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.ra_back.domain.healthz.JVMData;
import pl.raptors.ra_back.service.accounts.RoleService;
import org.apache.maven.model.Model;
import org.apache.maven.model.io.xpp3.MavenXpp3Reader;
import pl.raptors.ra_back.service.healthz.HealthzService;

// import java.io.FileReader;
// import java.io.IOException;

@RestController
@CrossOrigin
@RequestMapping("/healthz")
public class HealthzController {

    @Autowired
    private RoleService roleService;

    @Autowired
    private HealthzService healthzService;

    private static final String version = "1.8.5-manually"; //HealthzController.getVersion();
// private static final String version = HealthzController.getVersion();

    // private static String getVersion() {
    //     // MavenXpp3Reader reader = new MavenXpp3Reader();
    //     // Model model = null;
    //     // try {
    //     //     model = reader.read(new FileReader("pom.xml"));
    //     // } catch (IOException e) {
    //     //     e.printStackTrace();
    //     // } catch (XmlPullParserException e) {
    //     //     e.printStackTrace();
    //     // }
    //     // return model.getVersion();
    //     return "1.5.1-manually-NOPE";
    // }

    //@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @GetMapping("/backend")
    public Boolean isBackendWorking() {
        return true;
    }

    //@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @GetMapping("/backend/version")//zróbmy żeby bez tokenu może odrazu? no jest bez tokenu xD
    public String getBackendVersion() {
        return version;
        //return version;
    }

    //@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @GetMapping("/database")
    public Boolean isDatabaseWorking() {
        try {
            roleService.getAll();
        }
       catch (Exception e){
            return false;
       }
        return true;
    }

    //@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @GetMapping("/database/dbaddress")
    public String getServerAddress() {
        return healthzService.getDatabaseAddress();
    }

    //@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @GetMapping("/database/dbname")
    public String getDatabaseName() {
        return healthzService.getDatabaseName();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @GetMapping("/jvmMonitor")
    public JVMData jvmData() {
        HealthzService healthzService = new HealthzService();
        return healthzService.getData();
    }

}

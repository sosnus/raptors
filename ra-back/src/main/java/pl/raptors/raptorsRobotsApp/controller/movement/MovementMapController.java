package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementMap;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementPath;
import pl.raptors.raptorsRobotsApp.service.movement.MovementMapService;
import pl.raptors.raptorsRobotsApp.service.pgm.PGMIO;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(value = "/movement/maps")
public class MovementMapController {

    @Autowired
    MovementMapService movementMapService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<MovementMap> getAll() {
        return movementMapService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/add")
    public MovementMap add(@RequestBody @Valid MovementMap movementMap) {
        return movementMapService.addOne(movementMap);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/update")
    public MovementMap update(@RequestBody @Valid MovementMap movementMap) {
        if (movementMap.getId() != null) {
            return movementMapService.updateOne(movementMap);
        } else {
            return movementMapService.addOne(movementMap);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @PostMapping("/upload")
    public MovementMap upload(@RequestParam("name") String name, @RequestParam("mapImage") MultipartFile mapImage, @RequestParam("yamlFile") MultipartFile yamlFile) throws IOException {
        return movementMapService.addMovementMap(name, mapImage, yamlFile);
    }

    @GetMapping("/{id}")
    public MovementMap getOne(@PathVariable String id) {
        return movementMapService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping(value = "/jpg/{id}")
    public @ResponseBody
    String getImage(@PathVariable String id, HttpServletResponse response) throws IOException {
        MovementMap map = movementMapService.getOne(id);
        response.addHeader("map-name", map.getName());
        return Base64.getEncoder().encodeToString(PGMIO.pgm2jpg(map.getMapImage().getData()));
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid MovementMap movementMap) {
        movementMapService.deleteOne(movementMap);
    }
}

package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementMap;
import pl.raptors.raptorsRobotsApp.service.movement.MovementMapService;
import pl.raptors.raptorsRobotsApp.service.pgm.PGMIO;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

@Controller
@RequestMapping(value = "/movement/maps")
public class MovementMapController {

    @Autowired
    MovementMapService service;

    @GetMapping("/all")
    public List<MovementMap> getAll() {
        return service.getAll();
    }

    @PostMapping("/add")
    public MovementMap add(@RequestBody @Valid MovementMap movementMap) {
        return service.addOne(movementMap);
    }

    @GetMapping("/{id}")
    public MovementMap getOne(@PathVariable String id) {
        return service.getOne(id);
    }

    @GetMapping(value = "/jpg/{id}")
    public @ResponseBody
    String getImage(@PathVariable String id, HttpServletResponse response) throws IOException {
        MovementMap map = service.getOne(id);
        response.addHeader("map-name",map.getName());
        return Base64.getEncoder().encodeToString(PGMIO.pgm2jpg(map.getMapImage().getData()));
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid MovementMap movementMap) {
        service.deleteOne(movementMap);
    }
}

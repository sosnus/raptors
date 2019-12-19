package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementMap;
import pl.raptors.raptorsRobotsApp.service.movement.MovementMapService;
import pl.raptors.raptorsRobotsApp.service.pgm.PGMIO;
import java.io.IOException;
import java.util.Base64;

/**
 * Controller for movementMap.html and uploadMovementMap.html views.
 */

@Controller
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping(value = "/movement-view/maps", method = {RequestMethod.GET, RequestMethod.POST})
public class MovementMapViewController {

    @Autowired
    MovementMapService movementMapService;

    @PostMapping("/add")
    //@PostMapping("/maps/add")
    public String addMovementMap(@RequestParam("name") String name, @RequestParam("mapImage") MultipartFile mapImage, Model model) throws IOException {
        MovementMap map = movementMapService.addMovementMap(name, mapImage);
        return "redirect:/movement/maps/" + map.getId();
        /* return "redirect:/maps/"+id;*/
    }

    @GetMapping("/{id}")
    //@GetMapping("/maps/{id}")
    public String getMovementMap(@PathVariable String id, Model model) throws IOException{
        MovementMap movementMap = movementMapService.getOne(id);
        model.addAttribute("name", movementMap.getName());
        model.addAttribute("mapImage", Base64.getEncoder().encodeToString(PGMIO.pgm2jpg(movementMap.getMapImage().getData())));
        return "movementMap";
    }

    @GetMapping("/upload")
    public String uploadMovementMap(Model model) {
        return "uploadMovementMap";
    }

}

package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementMap;
import pl.raptors.raptorsRobotsApp.service.movement.MovementMapService;

import java.io.IOException;
import java.util.Base64;

@Controller
@RequestMapping(value = "/movement/maps", method = {RequestMethod.GET, RequestMethod.POST})
public class MovementMapController {
    @Autowired
    MovementMapService movementMapService;

    @PostMapping("/add")
    //@PostMapping("/maps/add")
    public String addMovementMap(@RequestParam("name") String name, @RequestParam("mapImage") MultipartFile mapImage, Model model) throws IOException {
        String id = movementMapService.addMovementMap(name,mapImage);
        return "redirect:/movement/maps/"+id;
       /* return "redirect:/maps/"+id;*/
    }

    @GetMapping("/{id}")
    //@GetMapping("/maps/{id}")
    public String getMovementMap (@PathVariable String id, Model model) {
        MovementMap movementMap= movementMapService.getMovementMap(id);
        model.addAttribute("name",movementMap.getName());
        model.addAttribute("mapImage", Base64.getEncoder().encodeToString(movementMap.getMapImage().getData()));
        return "movementMap";
    }


    @GetMapping("/upload")
    public String uploadMovementMap(Model model) {
        return "uploadMovementMap";
    }
}

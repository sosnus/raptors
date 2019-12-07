package pl.raptors.raptorsRobotsApp.controller.movement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementMap;
import pl.raptors.raptorsRobotsApp.service.movement.MovementMapService;
import pl.raptors.raptorsRobotsApp.service.movement.PGMIO;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
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
        String id = movementMapService.addMovementMap(name, mapImage);
        return "redirect:/movement/maps/" + id;
        /* return "redirect:/maps/"+id;*/
    }

    @GetMapping("/{id}")
    //@GetMapping("/maps/{id}")
    public String getMovementMap(@PathVariable String id, Model model) throws IOException{
        MovementMap movementMap = movementMapService.getMovementMap(id);
        model.addAttribute("name", movementMap.getName());
        model.addAttribute("mapImage", Base64.getEncoder().encodeToString(pgm2jpg(movementMap.getMapImage().getData())));
        return "movementMap";
    }


    @GetMapping("/upload")
    public String uploadMovementMap(Model model) {
        return "uploadMovementMap";
    }


    private static byte[] pgm2jpg(byte[] bytes) throws IOException {
        int[][] pixels = PGMIO.read(bytes);

        BufferedImage image = new BufferedImage(pixels.length, pixels[0].length, BufferedImage.TYPE_INT_RGB);
        for (int y = 0; y < pixels.length; y++) {
            for (int x = 0; x < pixels[0].length; x++) {
                int value = pixels[y][x] << 16 | pixels[y][x] << 8 | pixels[y][x];
                image.setRGB(x, y, value);
            }
        }
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        ImageIO.write( image, "jpg", baos );
        baos.flush();
        byte[] imageInByte = baos.toByteArray();
        baos.close();
        return imageInByte;
    }
}

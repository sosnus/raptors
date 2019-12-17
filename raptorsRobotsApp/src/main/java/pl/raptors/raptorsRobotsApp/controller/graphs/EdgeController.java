package pl.raptors.raptorsRobotsApp.controller.graphs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.graphs.Edge;
import pl.raptors.raptorsRobotsApp.service.graphs.EdgeService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/graphs/edges")
public class EdgeController {

    @Autowired
    EdgeService edgeService;

    @GetMapping("/all")
    public List<Edge> getAll() {
        return edgeService.getAll();
    }

    @PostMapping("/add")
    public Edge add(@RequestBody @Valid Edge edge) {
        return edgeService.addOne(edge);
    }

    @GetMapping("/{id}")
    public Edge getOne(@PathVariable String id) {
        return edgeService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Edge edge) {
        edgeService.deleteOne(edge);
    }
}

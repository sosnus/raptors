package pl.raptors.raptorsRobotsApp.controller.graphs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.graphs.Graph;
import pl.raptors.raptorsRobotsApp.service.graphs.GraphService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/graphs")
public class GraphController {

    @Autowired
    GraphService graphService;

    @GetMapping("/all")
    public List<Graph> getAll() {
        return graphService.getAll();
    }

    @PostMapping("/add")
    public Graph add(@RequestBody @Valid Graph graph) {
        return graphService.addOne(graph);
    }

    @GetMapping("/{id}")
    public Graph getOne(@PathVariable String id) {
        return graphService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Graph graph) {
        graphService.deleteOne(graph);
    }
}

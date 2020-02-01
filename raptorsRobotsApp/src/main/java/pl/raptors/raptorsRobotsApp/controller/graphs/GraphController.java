package pl.raptors.raptorsRobotsApp.controller.graphs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.graphs.Graph;
import pl.raptors.raptorsRobotsApp.service.graphs.GraphService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
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
        System.out.println(graph);
        return graphService.addOne(graph);
    }

    @PostMapping("/update")
    public Graph update(@RequestBody @Valid Graph graph) {
        return graphService.updateOne(graph);
    }

    @GetMapping("/{id}")
    public Graph getOne(@PathVariable String id) {
        return graphService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Graph graph) {
        graphService.deleteOne(graph);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteByID(@PathVariable String id) {
        graphService.deleteByID(id);
    }
}

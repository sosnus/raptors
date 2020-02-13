package pl.raptors.raptorsRobotsApp.controller.graphs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.graphs.Graph;
import pl.raptors.raptorsRobotsApp.service.graphs.GraphService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/graphs")
public class GraphController {

    @Autowired
    GraphService graphService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<Graph> getAll() {
        return graphService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/add")
    public Graph add(@RequestBody @Valid Graph graph) {
        if (graph.getId() != null) {
            return graphService.updateOne(graph);
        } else {
            return graphService.addOne(graph);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/update")
    public Graph update(@RequestBody @Valid Graph graph) {
        return graphService.updateOne(graph);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public Graph getOne(@PathVariable String id) {
        return graphService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Graph graph) {
        graphService.deleteOne(graph);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete/{id}")
    public void deleteByID(@PathVariable String id) {
        graphService.deleteByID(id);
    }
}

package pl.raptors.raptorsRobotsApp.controller.graphs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.graphs.Vertex;
import pl.raptors.raptorsRobotsApp.service.graphs.VertexService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/graphs/vertices")
public class VertexController {

    @Autowired
    VertexService vertexService;

    @GetMapping("/all")
    public List<Vertex> getAll() {
        return vertexService.getAll();
    }

    @PostMapping("/add")
    public Vertex add(@RequestBody @Valid Vertex vertex) {
        return vertexService.addOne(vertex);
    }

    @GetMapping("/{id}")
    public Vertex getOne(@PathVariable String id) {
        return vertexService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Vertex vertex) {
        vertexService.deleteOne(vertex);
    }
}

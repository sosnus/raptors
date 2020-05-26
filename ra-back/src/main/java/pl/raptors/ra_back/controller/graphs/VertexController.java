package pl.raptors.ra_back.controller.graphs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.ra_back.domain.graphs.Vertex;
import pl.raptors.ra_back.service.graphs.VertexService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/graphs/vertices")
public class VertexController {

    @Autowired
    VertexService vertexService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<Vertex> getAll() {
        return vertexService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/add")
    public Vertex add(@RequestBody @Valid Vertex vertex) {
        if (vertex.getId() != null) {
            return vertexService.updateOne(vertex);
        } else {
            return vertexService.addOne(vertex);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @PostMapping("/update")
    public Vertex update(@RequestBody @Valid Vertex vertex) {
        return vertexService.updateOne(vertex);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public Vertex getOne(@PathVariable String id) {
        return vertexService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid Vertex vertex) {
        vertexService.deleteOne(vertex);
    }
}

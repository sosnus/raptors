package pl.raptors.raptorsRobotsApp.service.graphs;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.repository.graphs.VertexRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;
import pl.raptors.raptorsRobotsApp.domain.graphs.Vertex;

import java.util.List;

//@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@Service
public class VertexService implements CRUDService<Vertex> {

    @Autowired
    VertexRepository vertexRepository;

    @Override
    public Vertex addOne(Vertex vertex) {
        return vertexRepository.save(vertex);
    }

    @Override
    public Vertex getOne(String id) {
        return vertexRepository.findById(id).orElse(null);
    }

    @Override
    public List<Vertex> getAll() {
        return vertexRepository.findAll();
    }

    @Override
    public Vertex updateOne(Vertex vertex) {
        return vertexRepository.save(vertex);
    }

    @Override
    public void deleteOne(Vertex vertex) {
        vertexRepository.delete(vertex);
    }
}

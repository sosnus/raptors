package pl.raptors.ra_back.service.graphs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.graphs.Vertex;
import pl.raptors.ra_back.repository.graphs.VertexRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.util.List;


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

    @Override
    public void deleteAll(List<Vertex> vertexList) {
        for (Vertex vertex : vertexList) {
            this.deleteOne(vertex);
        }
    }
}

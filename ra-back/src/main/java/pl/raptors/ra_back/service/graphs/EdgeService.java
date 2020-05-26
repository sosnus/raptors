package pl.raptors.ra_back.service.graphs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.repository.graphs.EdgeRepository;
import pl.raptors.ra_back.service.CRUDService;
import pl.raptors.ra_back.domain.graphs.Edge;

import java.util.List;

@Service
public class EdgeService implements CRUDService<Edge> {

    @Autowired
    EdgeRepository edgeRepository;

    @Override
    public Edge addOne(Edge edge) {
        return edgeRepository.save(edge);
    }

    @Override
    public Edge getOne(String id) {
        return edgeRepository.findById(id).orElse(null);
    }

    @Override
    public List<Edge> getAll() {
        return edgeRepository.findAll();
    }

    @Override
    public Edge updateOne(Edge edge) {
        return edgeRepository.save(edge);
    }

    @Override
    public void deleteOne(Edge edge) {
        edgeRepository.delete(edge);
    }

    @Override
    public void deleteAll(List<Edge> edgeList) {
        for (Edge edge : edgeList) {
            this.deleteOne(edge);
        }
    }
}

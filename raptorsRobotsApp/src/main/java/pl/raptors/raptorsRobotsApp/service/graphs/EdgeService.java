package pl.raptors.raptorsRobotsApp.service.graphs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.repository.graphs.EdgeRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;
import pl.raptors.raptorsRobotsApp.domain.graphs.Edge;

import java.util.List;
//@PreAuthorize("hasAuthority('ROLE_ADMIN')")
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
}

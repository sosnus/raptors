package pl.raptors.raptorsRobotsApp.service.graphs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.graphs.Edge;
import pl.raptors.raptorsRobotsApp.domain.graphs.Vertex;
import pl.raptors.raptorsRobotsApp.repository.graphs.EdgeRepository;
import pl.raptors.raptorsRobotsApp.repository.graphs.GraphRepository;
import pl.raptors.raptorsRobotsApp.repository.graphs.VertexRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;
import pl.raptors.raptorsRobotsApp.domain.graphs.Graph;

import java.util.List;

//@PreAuthorize("hasAuthority('ROLE_ADMIN')")
@Service
public class GraphService implements CRUDService<Graph> {

    @Autowired
    GraphRepository graphRepository;
    @Autowired
    EdgeRepository edgeRepository;
    @Autowired
    VertexRepository vertexRepository;

    @Override
    public Graph addOne(Graph graph) {
        List<Edge> edgesList = graph.getEdges();
        for (Edge e:edgesList) {
            List<Vertex> vertexList = e.getVerticesList();
            vertexRepository.saveAll(vertexList);
        }
        edgeRepository.saveAll(edgesList);
        return graphRepository.save(graph);
    }

    @Override
    public Graph getOne(String id) {
        return graphRepository.findById(id).orElse(null);
    }

    @Override
    public List<Graph> getAll() {
        return graphRepository.findAll();
    }

    @Override
    public Graph updateOne(Graph graph) {
        List<Edge> edgesList = graph.getEdges();
        for (Edge e:edgesList) {
            List<Vertex> vertexList = e.getVerticesList();
            vertexRepository.saveAll(vertexList);
        }
        edgeRepository.saveAll(edgesList);
        return graphRepository.save(graph);
    }

    /**
     * Deletes also all edges and vertices
     * of current graph from database
     * @param graph
     */
    @Override
    public void deleteOne(Graph graph) {
        List<Edge> edgesList = graph.getEdges();
        for (Edge e:edgesList) {
            List<Vertex> vertexList = e.getVerticesList();
            vertexRepository.deleteAll(vertexList);
        }
        edgeRepository.deleteAll(edgesList);
        graphRepository.delete(graph);
    }
}

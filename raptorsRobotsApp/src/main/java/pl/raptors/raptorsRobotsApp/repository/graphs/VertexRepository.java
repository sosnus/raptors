package pl.raptors.raptorsRobotsApp.repository.graphs;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.graphs.Vertex;

@Repository
public interface VertexRepository extends MongoRepository<Vertex, String> {
}
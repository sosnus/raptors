package pl.raptors.ra_back.repository.graphs;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.graphs.Vertex;

@Repository
public interface VertexRepository extends MongoRepository<Vertex, String> {
}

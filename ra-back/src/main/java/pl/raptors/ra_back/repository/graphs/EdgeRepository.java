package pl.raptors.ra_back.repository.graphs;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.graphs.Edge;

@Repository
public interface EdgeRepository extends MongoRepository<Edge, String> {
}

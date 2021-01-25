package pl.raptors.ra_back.repository.graphs;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.graphs.Graph;

import java.util.List;

@Repository
public interface GraphRepository extends MongoRepository<Graph, String> {
    List<Graph> findAllByMapId(String mapId);
}

package pl.raptors.raptorsRobotsApp.repository.graphs;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.graphs.Graph;

@Repository
public interface GraphRepository extends MongoRepository<Graph, String> {
}
package pl.raptors.raptorsRobotsApp.domain.graphs;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "graphs")
public class Graph {

    @Id
    private String id;
    private List<Edge> edges;

    protected Graph() {
        this.edges = new ArrayList<>();
    }

    public Graph(List<Edge> edges) {
        this.edges = edges;
    }
}
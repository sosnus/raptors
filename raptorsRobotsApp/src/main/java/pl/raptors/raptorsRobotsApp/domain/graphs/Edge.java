package pl.raptors.raptorsRobotsApp.domain.graphs;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@NoArgsConstructor
@Data
@Document(collection = "edges")
public class Edge {

    @Id
    private String id;
    private Vertex vertexA;
    private Vertex vertexB;
    private Boolean biDirected;

    public Edge(Vertex vertexA, Vertex vertexB, Boolean bidirected) {
        this.vertexA = vertexA;
        this.vertexB = vertexB;
        this.biDirected = bidirected;
    }
}
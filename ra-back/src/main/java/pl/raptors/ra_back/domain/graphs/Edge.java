package pl.raptors.ra_back.domain.graphs;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Arrays;
import java.util.List;

@NoArgsConstructor
@Data
@Document(collection = "edges")
public class Edge {

    @Id
    private String id;
    private Vertex vertexA;
    private Vertex vertexB;
    private Boolean biDirected;
    private Boolean narrow;
    private Boolean isActive;

    public Edge(Vertex vertexA, Vertex vertexB, Boolean bidirected, Boolean narrow, Boolean isActive) {
        this.vertexA = vertexA;
        this.vertexB = vertexB;
        this.biDirected = bidirected;
        this.narrow = narrow;
        this.isActive = isActive;
    }

    public List<Vertex> getVerticesList(){
        return  Arrays.asList(this.vertexA, this.vertexB);
    }
}

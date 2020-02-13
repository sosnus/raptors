package pl.raptors.raptorsRobotsApp.domain.accounts;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;
    private String email;
    private String password;
    private List<String> rolesIDs;

    protected User() {
        this.rolesIDs = new ArrayList<>();
    }

    public User(String email, String password, List<String> rolesIDs) {
        this.email = email;
        this.password = password;
        this.rolesIDs = rolesIDs;
    }
}


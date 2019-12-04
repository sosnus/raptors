package pl.raptors.raptorsRobotsApp.domain;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "users")//nazwa kolekcji po stronie mongo
public class User {

    @Id
    private String id; //w mongo musi być stringiem
    private String email;
    private String password;//potem trzeba będzie dać jakieś szyfrowanie, póki co przykładowo na sucho
    private List<Role> roles;

    protected User() {
        this.roles = new ArrayList<>();
    }

    public User(String email, String password, List<Role> roles) {
        this.email = email;
        this.password = password;
        this.roles = roles;
    }
}


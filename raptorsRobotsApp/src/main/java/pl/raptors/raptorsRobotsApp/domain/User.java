package pl.raptors.raptorsRobotsApp.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "users")//naswa kolekcji po stronie mongo
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

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}


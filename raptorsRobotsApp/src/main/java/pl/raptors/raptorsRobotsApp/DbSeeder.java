package pl.raptors.raptorsRobotsApp;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pl.raptors.raptorsRobotsApp.domain.Role;
import pl.raptors.raptorsRobotsApp.domain.User;
import pl.raptors.raptorsRobotsApp.repository.UserRepository;


import java.util.Arrays;
import java.util.Collections;
import java.util.List;

//bedzie to klasa wstawiająca do bazy przykladowego uzytkownika
@Component
public class DbSeeder implements CommandLineRunner {
    private UserRepository  userRepository;

    public DbSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void run(String... strings) {
        User testowyUser1 = new User(
                "testowy@gmail.com",
                "test",
                //jeśli więcej niż 1 rola, to Array.asList()
                Collections.singletonList(
                        new Role("regularUser")
                )

        );

        User testowyUser2 = new User(
                "kowalski@gmail.com",
                "test2",
                //jeśli więcej niż 1 rola, to Array.asList()
                Collections.singletonList(
                        new Role("regularUser")
                )

        );

        //wywalanie wszystkich userów
        this.userRepository.deleteAll();

        //wrzucanie utworzonych userów do bazy
        List<User> usersToAdd = Arrays.asList(testowyUser1, testowyUser2);
        this.userRepository.saveAll(usersToAdd);
    }

}

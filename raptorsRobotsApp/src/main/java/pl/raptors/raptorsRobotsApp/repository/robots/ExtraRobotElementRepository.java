package pl.raptors.raptorsRobotsApp.repository.robots;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.robots.ElementFunctionality;
import pl.raptors.raptorsRobotsApp.domain.robots.ExtraRobotElement;

import java.util.List;

@Repository
public interface ExtraRobotElementRepository extends MongoRepository<ExtraRobotElement, String> {
    ExtraRobotElement findByName (String name);
    List<ExtraRobotElement> findAllByFunctionalityListContaining(ElementFunctionality elementFunctionality);
}

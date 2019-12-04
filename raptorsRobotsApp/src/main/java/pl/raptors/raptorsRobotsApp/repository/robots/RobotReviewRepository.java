package pl.raptors.raptorsRobotsApp.repository.robots;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotReview;

@Repository
public interface RobotReviewRepository extends MongoRepository<RobotReview, String> {
}

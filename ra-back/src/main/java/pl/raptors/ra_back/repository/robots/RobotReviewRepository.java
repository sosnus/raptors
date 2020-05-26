package pl.raptors.ra_back.repository.robots;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.robots.Robot;
import pl.raptors.ra_back.domain.robots.RobotReview;
import pl.raptors.ra_back.domain.type.ReviewType;

import java.util.List;

@Repository
public interface RobotReviewRepository extends MongoRepository<RobotReview, String> {

    List<RobotReview> findAllByRobot(Robot robot);

    List<RobotReview> findAllByReviewType(ReviewType reviewType);
}

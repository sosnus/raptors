package pl.raptors.ra_back.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.robots.Robot;
import pl.raptors.ra_back.domain.robots.RobotReview;
import pl.raptors.ra_back.domain.type.ReviewType;
import pl.raptors.ra_back.repository.robots.RobotReviewRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.util.List;

@Service
public class RobotReviewService implements CRUDService<RobotReview> {

    @Autowired
    RobotReviewRepository robotReviewRepository;

    @Override
    public RobotReview addOne(RobotReview robotReview) {
        return robotReviewRepository.save(robotReview);
    }

    @Override
    public RobotReview getOne(String id) {
        return robotReviewRepository.findById(id).orElse(null);
    }

    @Override
    public List<RobotReview> getAll() {
        return robotReviewRepository.findAll();
    }

    @Override
    public RobotReview updateOne(RobotReview robotReview) {
        return robotReviewRepository.save(robotReview);
    }

    @Override
    public void deleteOne(RobotReview robotReview) {
        robotReviewRepository.delete(robotReview);
    }

    @Override
    public void deleteAll(List<RobotReview> robotReviewList) {
        for (RobotReview robotReview : robotReviewList) {
            this.deleteOne(robotReview);
        }
    }

    List<RobotReview> getByRobot(Robot robot) {
        return robotReviewRepository.findAllByRobot(robot);
    }

    public List<RobotReview> getByReviewType(ReviewType reviewType) {
        return robotReviewRepository.findAllByReviewType(reviewType);
    }
}

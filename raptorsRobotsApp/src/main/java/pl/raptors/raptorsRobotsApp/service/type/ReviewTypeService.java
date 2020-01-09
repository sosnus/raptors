package pl.raptors.raptorsRobotsApp.service.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotReview;
import pl.raptors.raptorsRobotsApp.domain.type.ReviewType;
import pl.raptors.raptorsRobotsApp.repository.type.ReviewTypeRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;
import pl.raptors.raptorsRobotsApp.service.robots.RobotReviewService;

import java.util.List;
import java.util.Objects;
//@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
@Service
public class ReviewTypeService implements CRUDService<ReviewType> {

    @Autowired
    ReviewTypeRepository reviewTypeRepository;
    @Autowired
    RobotReviewService robotReviewService;

    @Override
    public ReviewType addOne(ReviewType ReviewType) {
        ReviewType reviewTypeAlreadyExists = reviewTypeRepository.findByName(ReviewType.getName());
        if (Objects.isNull((reviewTypeAlreadyExists))) {
            reviewTypeRepository.save(ReviewType);
            return ReviewType;
        }
        return reviewTypeAlreadyExists;
    }

    @Override
    public ReviewType getOne(String id) {
        return reviewTypeRepository.findById(id).orElse(null);
    }

    @Override
    public List<ReviewType> getAll() {
        return reviewTypeRepository.findAll();
    }

    @Override
    public ReviewType updateOne(ReviewType reviewType) {
        List<RobotReview> reviewList = robotReviewService.getByReviewType(this.getOne(reviewType.getId()));
        for (RobotReview review : reviewList) {
            review.setReviewType(reviewType);
            robotReviewService.updateOne(review);
        }
        return reviewTypeRepository.save(reviewType);
    }

    @Override
    public void deleteOne(ReviewType reviewType) {
        ReviewType reviewTypeToDelete = reviewTypeRepository.findByName(reviewType.getName());
        if (!Objects.isNull((reviewTypeToDelete))) {
            reviewTypeRepository.delete(reviewTypeToDelete);
        }
    }
}

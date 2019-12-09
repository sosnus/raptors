package pl.raptors.raptorsRobotsApp.service.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.type.ReviewType;
import pl.raptors.raptorsRobotsApp.repository.type.ReviewTypeRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;
import java.util.Objects;

@Service
public class ReviewTypeService implements CRUDService<ReviewType> {

    @Autowired
    ReviewTypeRepository reviewTypeRepository;

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
    public ReviewType updateOne(ReviewType ReviewType) {
        return reviewTypeRepository.save(ReviewType);
    }

    @Override
    public void deleteOne(ReviewType ReviewType) {
        ReviewType ReviewTypeToDelete = reviewTypeRepository.findByName(ReviewType.getName());
        if (!Objects.isNull((ReviewTypeToDelete))) {
            reviewTypeRepository.delete(ReviewTypeToDelete);
        }
    }
}

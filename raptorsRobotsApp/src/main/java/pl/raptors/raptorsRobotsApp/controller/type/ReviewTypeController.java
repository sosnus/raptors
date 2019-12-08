package pl.raptors.raptorsRobotsApp.controller.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.type.ReviewType;
import pl.raptors.raptorsRobotsApp.service.type.ReviewTypeService;


import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/type/review-types")
public class ReviewTypeController {
    @Autowired
    ReviewTypeService reviewTypeService;

    @GetMapping("/all")
    public List<ReviewType> getAll() {
        return reviewTypeService.getAll();
    }

    @PostMapping("/add")
    public ReviewType add(@RequestBody @Valid ReviewType reviewType) {
        return reviewTypeService.addOne(reviewType);
    }

    @GetMapping("/{id}")
    public ReviewType getOne(@PathVariable String id) {
        return reviewTypeService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid ReviewType reviewType) {
        reviewTypeService.deleteOne(reviewType);
    }
}

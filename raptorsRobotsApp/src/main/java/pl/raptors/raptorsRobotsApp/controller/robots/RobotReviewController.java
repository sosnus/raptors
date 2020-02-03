package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotReview;
import pl.raptors.raptorsRobotsApp.service.robots.RobotReviewService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/robots/reviews")
public class RobotReviewController {

    @Autowired
    RobotReviewService robotReviewService;

    @GetMapping("/all")
    public List<RobotReview> getAll() {
        return robotReviewService.getAll();
    }

    @PostMapping("/add")
    public RobotReview add(@RequestBody @Valid RobotReview robotReview) {
        if (robotReview.getId() != null) {
            return robotReviewService.updateOne(robotReview);
        } else {
            return robotReviewService.addOne(robotReview);
        }
    }

    @PostMapping("/update")
    public RobotReview update(@RequestBody @Valid RobotReview robotReview) {
        return robotReviewService.updateOne(robotReview);
    }

    @GetMapping("/{id}")
    public RobotReview getOne(@PathVariable String id) {
        return robotReviewService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid RobotReview robotReview) {
        robotReviewService.deleteOne(robotReview);
    }
}

package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotReview;
import pl.raptors.raptorsRobotsApp.service.robots.RobotReviewService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/robots/reviews")
public class RobotReviewController {

    @Autowired
    RobotReviewService robotReviewService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<RobotReview> getAll() {
        return robotReviewService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/add")
    public RobotReview add(@RequestBody @Valid RobotReview robotReview) {
        if (robotReview.getId() != null) {
            return robotReviewService.updateOne(robotReview);
        } else {
            return robotReviewService.addOne(robotReview);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/update")
    public RobotReview update(@RequestBody @Valid RobotReview robotReview) {
        return robotReviewService.updateOne(robotReview);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public RobotReview getOne(@PathVariable String id) {
        return robotReviewService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid RobotReview robotReview) {
        robotReviewService.deleteOne(robotReview);
    }
}

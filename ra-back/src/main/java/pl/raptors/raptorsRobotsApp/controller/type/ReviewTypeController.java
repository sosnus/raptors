package pl.raptors.raptorsRobotsApp.controller.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.type.ReviewType;
import pl.raptors.raptorsRobotsApp.service.type.ReviewTypeService;


import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/type/review-types")
public class ReviewTypeController {
    @Autowired
    ReviewTypeService reviewTypeService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<ReviewType> getAll() {
        return reviewTypeService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/add")
    public ReviewType add(@RequestBody @Valid ReviewType reviewType) {
        if (reviewType.getId() != null) {
            return reviewTypeService.updateOne(reviewType);
        } else {
            return reviewTypeService.addOne(reviewType);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/update")
    public ReviewType update(@RequestBody @Valid ReviewType reviewType) {
        return reviewTypeService.updateOne(reviewType);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public ReviewType getOne(@PathVariable String id) {
        return reviewTypeService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid ReviewType reviewType) {
        reviewTypeService.deleteOne(reviewType);
    }
}

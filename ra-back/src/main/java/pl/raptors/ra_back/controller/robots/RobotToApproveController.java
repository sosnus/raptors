package pl.raptors.ra_back.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.ra_back.domain.robots.RobotToApprove;
import pl.raptors.ra_back.service.robots.RobotToApproveService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/robots-temp")
public class RobotToApproveController {

    @Autowired
    RobotToApproveService robotToApproveService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<RobotToApprove> getAll() {
        return robotToApproveService.getAll();
    }

    @PostMapping("/add")
    public RobotToApprove add(@RequestBody @Valid RobotToApprove robot) {
        return robotToApproveService.addOne(robot);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @PostMapping("/approve")
    public void approveOne(@RequestBody @Valid RobotToApprove robot) {
        robotToApproveService.approveOne(robot);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_ROBOT')")
    @PostMapping("/update")
    public RobotToApprove update(@RequestBody @Valid RobotToApprove robot) {
        return robotToApproveService.updateOne(robot);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER') or hasAuthority('ROLE_ROBOT')")
    @GetMapping("/{id}")
    public RobotToApprove getOne(@PathVariable String id) {
        return robotToApproveService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_ROBOT')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid RobotToApprove robot) {
        robotToApproveService.deleteOne(robot);
    }
}


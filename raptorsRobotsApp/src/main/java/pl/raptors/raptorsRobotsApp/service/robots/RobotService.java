package pl.raptors.raptorsRobotsApp.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.Pose;
import pl.raptors.raptorsRobotsApp.domain.robots.*;
import pl.raptors.raptorsRobotsApp.domain.type.ReviewType;
import pl.raptors.raptorsRobotsApp.domain.type.RobotStatus;
import pl.raptors.raptorsRobotsApp.repository.robots.RobotRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class RobotService implements CRUDService<Robot> {

    @Autowired
    RobotRepository robotRepository;
    @Autowired
    RobotReviewService robotReviewService;
    @Autowired
    RobotTaskService robotTaskService;

    @Override
    public Robot addOne(Robot robot) {
        return robotRepository.save(robot);
    }

    @Override
    public Robot getOne(String id) {
        return robotRepository.findById(id).orElse(null);
    }

    @Override
    public List<Robot> getAll() {
        return robotRepository.findAll();
    }

    @Override
    public Robot updateOne(Robot robot) {
        List<RobotReview> reviewList = robotReviewService.getByRobot(this.getOne(robot.getId()));
        for (RobotReview review : reviewList) {
            review.setRobot(robot);
            robotReviewService.updateOne(review);
        }
        List<RobotTask> taskList = robotTaskService.getByRobot(this.getOne(robot.getId()));
        for (RobotTask task : taskList) {
            task.setRobot(robot);
            robotTaskService.updateOne(task);
        }
        return robotRepository.save(robot);
    }

    @Override
    public void deleteOne(Robot robot) {
        robotRepository.delete(robot);
    }

    public List<String> getAllById() {
        return robotRepository.findAll().stream().map(Robot::getId).collect(Collectors.toList());
    }

    public Pose getOneRobotPose(String id) {
        return Objects.requireNonNull(robotRepository.findById(id).orElse(null)).getPose();
    }

    List<Robot> getByExtraElement(ExtraRobotElement extraRobotElement) {
        return robotRepository.findAllByExtraRobotElement(extraRobotElement);
    }

    List<Robot> getByModel(RobotModel model) {
        return robotRepository.findAllByModel(model);
    }

    List<Robot> getByBattery(RobotBattery battery) {
        return robotRepository.findAllByBattery(battery);
    }

    public List<Robot> getByStatus(RobotStatus status) {
        return robotRepository.findAllByStatusContaining(status);
    }
}

package pl.raptors.raptorsRobotsApp.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.accounts.User;
import pl.raptors.raptorsRobotsApp.domain.movement.Pose;
import pl.raptors.raptorsRobotsApp.domain.robots.*;
import pl.raptors.raptorsRobotsApp.domain.type.RobotStatus;
import pl.raptors.raptorsRobotsApp.repository.robots.RobotRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;
import pl.raptors.raptorsRobotsApp.service.accounts.RoleService;
import pl.raptors.raptorsRobotsApp.service.accounts.UserService;

import java.text.SimpleDateFormat;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RobotService implements CRUDService<Robot> {

    @Autowired
    RobotRepository robotRepository;
    @Autowired
    RobotReviewService robotReviewService;
    @Autowired
    RobotTaskService robotTaskService;
    @Autowired
    UserService userService;
    @Autowired
    RoleService roleService;

    @Override
    public Robot addOne(Robot robot) {
        return robotRepository.save(robot);
    }

    public Robot addRobotAndCreateAccount (Robot robot, String password){
        //format czasu
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        robot.setTimestamp(formatter.format(new Date()));
        robotRepository.save(robot);
        User robotUser = new User(robot.getId(), password, Collections.singletonList(roleService.getRoleIdByRoleName("ROLE_ROBOT")));
        userService.addOne(robotUser);
        return robot;
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
        //format czasu
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        Robot oldRobot = robotRepository.findById(robot.getId()).orElse(null);
        if(oldRobot!=null){
            if(robot.getAvailable()==null)robot.setAvailable(oldRobot.getAvailable());
            if(robot.getRobotIp()==null)robot.setRobotIp(oldRobot.getRobotIp());
            if(robot.getExtraRobotElement()==null)robot.setExtraRobotElement(oldRobot.getExtraRobotElement());
            if(robot.getModel()==null)robot.setModel(oldRobot.getModel());
            if(robot.getPose()==null)robot.setPose(oldRobot.getPose());
            if(robot.getBattery()==null)robot.setBattery(oldRobot.getBattery());
            if(robot.getBatteryLevel()==null)robot.setBatteryLevel(oldRobot.getBatteryLevel());
            if(robot.getStatus()==null)robot.setStatus(oldRobot.getStatus());
            if(robot.getTimestamp()==null)robot.setTimestamp(formatter.format(new Date()));
        }
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
        User robotUser = userService.getByEmail(robot.getId());
        userService.deleteOne(robotUser);
        List<RobotReview> reviewList = robotReviewService.getByRobot(this.getOne(robot.getId()));
        robotReviewService.deleteAll(reviewList);
        List<RobotTask> taskList = robotTaskService.getByRobot(this.getOne(robot.getId()));
        robotTaskService.deleteAll(taskList);
        robotRepository.delete(robot);
    }

    @Override
    public void deleteAll(List<Robot> robotList) {
        for (Robot robot : robotList) {
            this.deleteOne(robot);
        }
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

package pl.raptors.raptorsRobotsApp.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.robots.*;
import pl.raptors.raptorsRobotsApp.domain.type.RobotStatus;
import pl.raptors.raptorsRobotsApp.repository.robots.ExtraRobotElementRepository;
import pl.raptors.raptorsRobotsApp.repository.robots.RobotModelRepository;
import pl.raptors.raptorsRobotsApp.repository.robots.RobotRepository;
import pl.raptors.raptorsRobotsApp.repository.robots.RobotToApproveRepository;
import pl.raptors.raptorsRobotsApp.repository.type.RobotStatusRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.*;

@Service
public class RobotToApproveService implements CRUDService<RobotToApprove> {

    @Autowired
    RobotToApproveRepository robotToApproveRepository;
    @Autowired
    RobotService robotService;

    @Autowired
    RobotModelRepository robotModelRepository;
    @Autowired
    ExtraRobotElementRepository extraRobotElementRepository;
    @Autowired
    RobotStatusRepository robotStatusRepository;

    @Override
    public RobotToApprove addOne(RobotToApprove robot) {
        if (robotService.getOne(robot.getId()) == null && this.getOne(robot.getId()) == null) {
            robot.setModel(robotModelRepository.findById(robot.getModel().getId()).get());
            robot.setExtraRobotElement((extraRobotElementRepository.findById(robot.getExtraRobotElement().getId()).get()));
            List<String> statusIdList = new ArrayList<>();
            for (RobotStatus status : robot.getStatus()) {
                statusIdList.add(status.getId());
            }
            robot.setStatus(robotStatusRepository.findAllByIdIn(statusIdList));
            return robotToApproveRepository.save(robot);
        } else
            return null;
    }

    @Override
    public RobotToApprove getOne(String id) {
        return robotToApproveRepository.findById(id).orElse(null);
    }

    @Override
    public List<RobotToApprove> getAll() {
        return robotToApproveRepository.findAll();
    }


    @Override
    public RobotToApprove updateOne(RobotToApprove robot) {
        return robotToApproveRepository.save(robot);
    }

    @Override
    public void deleteOne(RobotToApprove robot) {
        robotToApproveRepository.delete(robot);
    }

    @Override
    public void deleteAll(List<RobotToApprove> robotList) {
        for (RobotToApprove robot : robotList) {
            this.deleteOne(robot);
        }
    }

    public void approveOne(RobotToApprove robot) {
        Robot robotToAdd = new Robot(robot.getRobotIp(), robot.getAvailable(), robot.getExtraRobotElement(), robot.getModel(), robot.getPose(), null, robot.getBatteryLevel(), robot.getStatus());
        robotToAdd.setId(robot.getId());
        robotService.addRobotAndCreateAccount(robotToAdd, robot.getPassword());
        this.deleteOne(robot);
    }
}

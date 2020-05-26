package pl.raptors.ra_back.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.robots.*;
import pl.raptors.ra_back.domain.robots.RobotStatus;
import pl.raptors.ra_back.repository.robots.ExtraRobotElementRepository;
import pl.raptors.ra_back.repository.robots.RobotModelRepository;
import pl.raptors.ra_back.repository.robots.RobotToApproveRepository;
import pl.raptors.ra_back.repository.type.RobotStatusRepository;
import pl.raptors.ra_back.service.CRUDService;

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
    RobotModelService robotModelService;
    @Autowired
    ExtraRobotElementService extraRobotElementService;

    @Autowired
    RobotStatusRepository robotStatusRepository;

    @Override
    public RobotToApprove addOne(RobotToApprove robot) {
        if (robotService.getOne(robot.getId()) == null && this.getOne(robot.getId()) == null) {

            if (robotModelService.getOne(robot.getModel().getName()) != null)
                robot.setModel(robotModelService.getOne(robot.getModel().getName()));

            if (extraRobotElementService.getOne(robot.getExtraRobotElement().getName()) != null)
                robot.setExtraRobotElement(extraRobotElementService.getOne(robot.getExtraRobotElement().getName()));

            List<String> statusNameList = new ArrayList<>();
            for (RobotStatus status : robot.getStatus()) {
                statusNameList.add(status.getName());
            }

            if (robotStatusRepository.findAllByIdIn(statusNameList) != null)
                robot.setStatus(robotStatusRepository.findAllByIdIn(statusNameList));

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

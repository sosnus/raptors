package pl.raptors.ra_back.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.robots.Behaviour;
import pl.raptors.ra_back.domain.robots.Robot;
import pl.raptors.ra_back.domain.robots.RobotTask;
import pl.raptors.ra_back.domain.type.TaskPriority;
import pl.raptors.ra_back.repository.robots.RobotTaskRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.util.List;

@Service
public class RobotTaskService implements CRUDService<RobotTask> {

    @Autowired
    RobotTaskRepository robotTaskRepository;

    @Override
    public RobotTask addOne(RobotTask robotTask) {
        return robotTaskRepository.save(robotTask);
    }

    @Override
    public RobotTask getOne(String id) {
        return robotTaskRepository.findById(id).orElse(null);
    }

    @Override
    public List<RobotTask> getAll() {
        return robotTaskRepository.findAll();
    }

    @Override
    public RobotTask updateOne(RobotTask robotTask) {
        return robotTaskRepository.save(robotTask);
    }

    @Override
    public void deleteOne(RobotTask robotTask) {
        robotTaskRepository.delete(robotTask);
    }

    @Override
    public void deleteAll(List<RobotTask> robotTaskList) {
        for (RobotTask robotTask : robotTaskList) {
            this.deleteOne(robotTask);
        }
    }

    public List<RobotTask> getByRobot(Robot robot) {
        return robotTaskRepository.findAllByRobot(robot);
    }

    public List<RobotTask> getByBehaviour(Behaviour behaviour) {
        return robotTaskRepository.findAllByBehavioursContaining(behaviour);
    }

    public List<RobotTask> getTasksByUsersIds (List<String> userIdList){
        return robotTaskRepository.findAllByUserIDIn(userIdList);
    }

    public List<RobotTask> getByPriority(TaskPriority priority) {
        return robotTaskRepository.findAllByPriority(priority);
    }
}

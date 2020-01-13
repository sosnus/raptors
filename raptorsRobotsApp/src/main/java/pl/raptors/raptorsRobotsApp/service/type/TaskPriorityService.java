package pl.raptors.raptorsRobotsApp.service.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotTask;
import pl.raptors.raptorsRobotsApp.domain.type.TaskPriority;
import pl.raptors.raptorsRobotsApp.repository.type.TaskPriorityRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;
import pl.raptors.raptorsRobotsApp.service.robots.RobotTaskService;

import java.util.List;
import java.util.Objects;
//@PreAuthorize("hasAuthority('ROLE_ADMIN') or hasRole('ROLE_REGULAR_USER')")
@Service
public class TaskPriorityService implements CRUDService<TaskPriority> {

    @Autowired
    TaskPriorityRepository taskPriorityRepository;
    @Autowired
    RobotTaskService robotTaskService;

    @Override
    public TaskPriority addOne(TaskPriority TaskPriority) {
        TaskPriority taskPriorityAlreadyExists = taskPriorityRepository.findByName(TaskPriority.getName());
        if (Objects.isNull((taskPriorityAlreadyExists))) {
            taskPriorityRepository.save(TaskPriority);
            return TaskPriority;
        }
        return taskPriorityAlreadyExists;
    }

    @Override
    public TaskPriority getOne(String id) {
        return taskPriorityRepository.findById(id).orElse(null);
    }

    @Override
    public List<TaskPriority> getAll() {
        return taskPriorityRepository.findAll();
    }

    @Override
    public TaskPriority updateOne(TaskPriority taskPriority) {
        List<RobotTask> taskList = robotTaskService.getByPriority(this.getOne(taskPriority.getId()));
        for (RobotTask task : taskList) {
            task.setPriority(taskPriority);
            robotTaskService.updateOne(task);
        }
        return taskPriorityRepository.save(taskPriority);
    }

    @Override
    public void deleteOne(TaskPriority taskPriority) {
        TaskPriority taskPriorityToDelete = taskPriorityRepository.findByName(taskPriority.getName());
        if (!Objects.isNull((taskPriorityToDelete))) {
            taskPriorityRepository.delete(taskPriorityToDelete);
        }
    }

}

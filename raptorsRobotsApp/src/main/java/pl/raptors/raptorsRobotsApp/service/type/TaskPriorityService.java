package pl.raptors.raptorsRobotsApp.service.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.type.TaskPriority;
import pl.raptors.raptorsRobotsApp.repository.type.TaskPriorityRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;
import java.util.Objects;

@Service
public class TaskPriorityService implements CRUDService<TaskPriority> {
    
    @Autowired
    TaskPriorityRepository taskPriorityRepository;

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
    public TaskPriority updateOne(TaskPriority TaskPriority) {
        return taskPriorityRepository.save(TaskPriority);
    }

    @Override
    public void deleteOne(TaskPriority TaskPriority) {
        TaskPriority TaskPriorityToDelete = taskPriorityRepository.findByName(TaskPriority.getName());
        if (!Objects.isNull((TaskPriorityToDelete))) {
            taskPriorityRepository.delete(TaskPriorityToDelete);
        }
    }
    
}

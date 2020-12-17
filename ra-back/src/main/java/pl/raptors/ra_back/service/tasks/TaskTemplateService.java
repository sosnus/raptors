package pl.raptors.ra_back.service.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.robots.Behaviour;
import pl.raptors.ra_back.domain.tasks.TaskTemplate;
import pl.raptors.ra_back.domain.type.TaskPriority;
import pl.raptors.ra_back.repository.tasks.TaskTemplateRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.util.List;

@Service
public class TaskTemplateService implements CRUDService<TaskTemplate> {

    @Autowired
    TaskTemplateRepository taskTemplateRepository;

    @Override
    public TaskTemplate addOne(TaskTemplate taskTemplate) {
        return taskTemplateRepository.save(taskTemplate);
    }

    @Override
    public TaskTemplate getOne(String id) {
        return taskTemplateRepository.findById(id).orElse(null);
    }

    @Override
    public List<TaskTemplate> getAll() {
        return taskTemplateRepository.findAll();
    }

    @Override
    public TaskTemplate updateOne(TaskTemplate taskTemplate) {
        return taskTemplateRepository.save(taskTemplate);
    }

    @Override
    public void deleteOne(TaskTemplate taskTemplate) {
        taskTemplateRepository.delete(taskTemplate);
    }

    @Override
    public void deleteAll(List<TaskTemplate> robotTaskList) {
        for (TaskTemplate taskTemplate : robotTaskList) {
            this.deleteOne(taskTemplate);
        }
    }

    public List<TaskTemplate> getByBehaviour(Behaviour behaviour) {
        return taskTemplateRepository.findAllByBehavioursContaining(behaviour);
    }

    public List<TaskTemplate> getByKioskId(String kioskId) {
        return taskTemplateRepository.findAllByKioskId(kioskId);
    }

    public List<TaskTemplate> getByPriority(TaskPriority priority) {
        return taskTemplateRepository.findAllByPriority(priority);
    }
}

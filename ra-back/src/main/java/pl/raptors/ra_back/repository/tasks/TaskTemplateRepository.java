package pl.raptors.ra_back.repository.tasks;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.robots.Behaviour;
import pl.raptors.ra_back.domain.robots.Robot;
import pl.raptors.ra_back.domain.tasks.TaskTemplate;
import pl.raptors.ra_back.domain.type.TaskPriority;

import java.util.List;

@Repository
public interface TaskTemplateRepository extends MongoRepository<TaskTemplate, String> {

    List<TaskTemplate> findAllByBehavioursContaining(Behaviour behaviour);

    List<TaskTemplate> findAllByKioskId(String kioskId);

    List<TaskTemplate> findAllByPriority(TaskPriority priority);

    List<TaskTemplate> findAllByMapId(String mapId);
}

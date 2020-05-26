package pl.raptors.ra_back.repository.type;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.type.TaskPriority;

@Repository
public interface TaskPriorityRepository extends MongoRepository<TaskPriority,String> {
    public TaskPriority findByName(String name);
}

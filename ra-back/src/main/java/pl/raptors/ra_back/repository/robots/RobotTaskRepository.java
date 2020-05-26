package pl.raptors.ra_back.repository.robots;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.robots.Behaviour;
import pl.raptors.ra_back.domain.robots.Robot;
import pl.raptors.ra_back.domain.robots.RobotTask;
import pl.raptors.ra_back.domain.type.TaskPriority;

import java.util.List;

@Repository
public interface RobotTaskRepository extends MongoRepository<RobotTask, String> {

    List<RobotTask> findAllByRobot(Robot robot);

    List<RobotTask> findAllByBehavioursContaining(Behaviour behaviour);

    List<RobotTask> findAllByPriority(TaskPriority priority);

    List<RobotTask> findAllByUserIDIn(List<String> userIdList);
}

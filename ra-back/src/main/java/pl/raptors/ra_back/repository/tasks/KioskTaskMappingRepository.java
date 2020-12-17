package pl.raptors.ra_back.repository.tasks;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.robots.Behaviour;
import pl.raptors.ra_back.domain.robots.Robot;
import pl.raptors.ra_back.domain.tasks.KioskTaskMapping;
import pl.raptors.ra_back.domain.type.TaskPriority;

import java.util.List;

@Repository
public interface KioskTaskMappingRepository extends MongoRepository<KioskTaskMapping, String> {
}

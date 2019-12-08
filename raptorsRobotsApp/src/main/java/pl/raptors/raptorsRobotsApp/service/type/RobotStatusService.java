package pl.raptors.raptorsRobotsApp.service.type;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.type.RobotStatus;
import pl.raptors.raptorsRobotsApp.repository.type.RobotStatusRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;
import java.util.Objects;

@Service
public class RobotStatusService implements CRUDService<RobotStatus> {

    @Autowired
    RobotStatusRepository robotStatusRepository;

    @Override
    public RobotStatus addOne(RobotStatus RobotStatus) {
        RobotStatus robotStatusAlreadyExists = robotStatusRepository.findByName(RobotStatus.getName());
        if (Objects.isNull((robotStatusAlreadyExists))) {
            robotStatusRepository.save(RobotStatus);
            return RobotStatus;
        }
        return robotStatusAlreadyExists;
    }

    @Override
    public RobotStatus getOne(String id) {
        return robotStatusRepository.findById(id).orElse(null);
    }

    @Override
    public List<RobotStatus> getAll() {
        return robotStatusRepository.findAll();
    }

    @Override
    public RobotStatus updateOne(RobotStatus RobotStatus) {
        return robotStatusRepository.save(RobotStatus);
    }

    @Override
    public void deleteOne(RobotStatus RobotStatus) {
        RobotStatus RobotStatusToDelete = robotStatusRepository.findByName(RobotStatus.getName());
        if (!Objects.isNull((RobotStatusToDelete))) {
            robotStatusRepository.delete(RobotStatusToDelete);
        }
    }
}

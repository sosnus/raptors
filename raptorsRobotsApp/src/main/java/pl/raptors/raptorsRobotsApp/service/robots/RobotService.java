package pl.raptors.raptorsRobotsApp.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.robots.Robot;
import pl.raptors.raptorsRobotsApp.repository.robots.RobotRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RobotService implements CRUDService<Robot> {

    @Autowired
    RobotRepository robotRepository;

    @Override
    public Robot addOne(Robot robot) {
        return robotRepository.save(robot);
    }

    @Override
    public Robot getOne(String id) {
        return robotRepository.findById(id).orElse(null);
    }

    @Override
    public List<Robot> getAll() {
        return robotRepository.findAll();
    }

    @Override
    public Robot updateOne(Robot robot) {
        return robotRepository.save(robot);
    }

    @Override
    public void deleteOne(Robot robot) {
        robotRepository.delete(robot);
    }

    public List<String> getAllById() {
        return robotRepository.findAll().stream().map(Robot::getId).collect(Collectors.toList());
    }
}

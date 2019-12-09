package pl.raptors.raptorsRobotsApp.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.robots.RobotModel;
import pl.raptors.raptorsRobotsApp.repository.robots.RobotModelRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

@Service
public class RobotModelService implements CRUDService<RobotModel> {

    @Autowired
    RobotModelRepository robotModelRepository;

    @Override
    public RobotModel addOne(RobotModel robotModel) {
        return robotModelRepository.save(robotModel);
    }

    @Override
    public RobotModel getOne(String id) {
        return robotModelRepository.findById(id).orElse(null);
    }

    @Override
    public List<RobotModel> getAll() {
        return robotModelRepository.findAll();
    }

    @Override
    public RobotModel updateOne(RobotModel robotModel) {
        return robotModelRepository.save(robotModel);
    }

    @Override
    public void deleteOne(RobotModel robotModel) {
        robotModelRepository.delete(robotModel);
    }
}

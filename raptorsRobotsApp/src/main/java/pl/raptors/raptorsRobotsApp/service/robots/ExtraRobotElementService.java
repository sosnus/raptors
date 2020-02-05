package pl.raptors.raptorsRobotsApp.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.robots.ElementFunctionality;
import pl.raptors.raptorsRobotsApp.domain.robots.ExtraRobotElement;
import pl.raptors.raptorsRobotsApp.domain.robots.Robot;
import pl.raptors.raptorsRobotsApp.repository.robots.ExtraRobotElementRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

@Service
public class ExtraRobotElementService implements CRUDService<ExtraRobotElement> {

    @Autowired
    ExtraRobotElementRepository extraRobotElementRepository;
    @Autowired
    RobotService robotService;

    @Override
    public ExtraRobotElement addOne(ExtraRobotElement extraRobotElement) {
        return extraRobotElementRepository.save(extraRobotElement);
    }

    @Override
    public ExtraRobotElement getOne(String id) {
        return extraRobotElementRepository.findById(id).orElse(null);
    }

    @Override
    public List<ExtraRobotElement> getAll() {
        return extraRobotElementRepository.findAll();
    }

    @Override
    public ExtraRobotElement updateOne(ExtraRobotElement extraRobotElement) {
        List<Robot> robotList = robotService.getByExtraElement(this.getOne(extraRobotElement.getId()));
        for (Robot robot : robotList) {
            robot.setExtraRobotElement(extraRobotElement);
            robotService.updateOne(robot);
        }
        return extraRobotElementRepository.save(extraRobotElement);
    }

    @Override
    public void deleteOne(ExtraRobotElement extraRobotElement) {
        List<Robot> robotList = robotService.getByExtraElement(this.getOne(extraRobotElement.getId()));
        robotService.deleteAll(robotList);
        extraRobotElementRepository.delete(extraRobotElement);
    }

    @Override
    public void deleteAll(List<ExtraRobotElement> extraRobotElementList) {
        for (ExtraRobotElement extraRobotElement : extraRobotElementList) {
            this.deleteOne(extraRobotElement);
        }
    }

    List<ExtraRobotElement> getByelementFunctionality(ElementFunctionality elementFunctionality) {
        return extraRobotElementRepository.findAllByFunctionalityListContaining(elementFunctionality);
    }
}

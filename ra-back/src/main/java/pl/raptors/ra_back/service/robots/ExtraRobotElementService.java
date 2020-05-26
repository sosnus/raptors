package pl.raptors.ra_back.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.robots.ElementFunctionality;
import pl.raptors.ra_back.domain.robots.ExtraRobotElement;
import pl.raptors.ra_back.domain.robots.Robot;
import pl.raptors.ra_back.repository.robots.ExtraRobotElementRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.util.List;
import java.util.Objects;

@Service
public class ExtraRobotElementService implements CRUDService<ExtraRobotElement> {

    @Autowired
    ExtraRobotElementRepository extraRobotElementRepository;
    @Autowired
    RobotService robotService;

    @Override
    public ExtraRobotElement addOne(ExtraRobotElement extraRobotElement) {
        if (Objects.isNull((extraRobotElementRepository.findByName(extraRobotElement.getName())))) {
            extraRobotElement.setId(extraRobotElement.getName());
            return extraRobotElementRepository.save(extraRobotElement);
        }
        return extraRobotElementRepository.findByName(extraRobotElement.getName());
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

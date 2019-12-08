package pl.raptors.raptorsRobotsApp.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.robots.ElementFunctionality;
import pl.raptors.raptorsRobotsApp.repository.robots.ElementFunctionalityRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

@Service
public class ElementFunctionalityService implements CRUDService<ElementFunctionality> {

    @Autowired
    ElementFunctionalityRepository elementFunctionalityRepository;

    @Override
    public ElementFunctionality addOne(ElementFunctionality elementFunctionality) {
        return elementFunctionalityRepository.save(elementFunctionality);
    }

    @Override
    public ElementFunctionality getOne(String id) {
        return elementFunctionalityRepository.findById(id).orElse(null);
    }

    @Override
    public List<ElementFunctionality> getAll() {
        return elementFunctionalityRepository.findAll();
    }

    @Override
    public ElementFunctionality updateOne(ElementFunctionality elementFunctionality) {
        return elementFunctionalityRepository.save(elementFunctionality);
    }

    @Override
    public void deleteOne(ElementFunctionality elementFunctionality) {
        elementFunctionalityRepository.delete(elementFunctionality);
    }
}

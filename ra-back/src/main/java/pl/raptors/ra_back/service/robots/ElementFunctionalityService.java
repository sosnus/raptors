package pl.raptors.ra_back.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.robots.ElementFunctionality;
import pl.raptors.ra_back.domain.robots.ExtraRobotElement;
import pl.raptors.ra_back.repository.robots.ElementFunctionalityRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.util.List;

@Service
public class ElementFunctionalityService implements CRUDService<ElementFunctionality> {

    @Autowired
    ElementFunctionalityRepository elementFunctionalityRepository;
    @Autowired
    ExtraRobotElementService extraRobotElementService;

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
        List<ExtraRobotElement> extraElementList = extraRobotElementService.getByelementFunctionality(this.getOne(elementFunctionality.getId()));
        int index;
        for (ExtraRobotElement element : extraElementList) {
            List<ElementFunctionality> listToUpdate = element.getFunctionalityList();
            for (ElementFunctionality functionality : listToUpdate) {
                if (functionality.getId().equals(elementFunctionality.getId())) {
                    index = listToUpdate.indexOf(functionality);
                    listToUpdate.set(index, elementFunctionality);
                    element.setFunctionalityList(listToUpdate);
                    extraRobotElementService.updateOne(element);
                }
            }
        }
        return elementFunctionalityRepository.save(elementFunctionality);
    }

    @Override
    public void deleteOne(ElementFunctionality elementFunctionality) {
        List<ExtraRobotElement> extraElementList = extraRobotElementService.getByelementFunctionality(this.getOne(elementFunctionality.getId()));
        extraRobotElementService.deleteAll(extraElementList);
        elementFunctionalityRepository.delete(elementFunctionality);
    }

    @Override
    public void deleteAll(List<ElementFunctionality> elementFunctionalityList) {
        for (ElementFunctionality elementFunctionality : elementFunctionalityList) {
            this.deleteOne(elementFunctionality);
        }
    }
}

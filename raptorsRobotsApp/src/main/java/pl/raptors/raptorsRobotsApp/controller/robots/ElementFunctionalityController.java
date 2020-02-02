package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.ElementFunctionality;
import pl.raptors.raptorsRobotsApp.service.robots.ElementFunctionalityService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/robots/element-functionalities")
public class ElementFunctionalityController {

    @Autowired
    ElementFunctionalityService elementFunctionalityService;

    @GetMapping("/all")
    public List<ElementFunctionality> getAll() {
        return elementFunctionalityService.getAll();
    }

    @PostMapping("/add")
    public ElementFunctionality add(@RequestBody @Valid ElementFunctionality elementFunctionality) {
        if (elementFunctionality.getId() != null) {
            return elementFunctionalityService.updateOne(elementFunctionality);
        } else {
            return elementFunctionalityService.addOne(elementFunctionality);
        }
    }

    @PostMapping("/update")
    public ElementFunctionality update(@RequestBody @Valid ElementFunctionality elementFunctionality) {
        return elementFunctionalityService.updateOne(elementFunctionality);
    }

    @GetMapping("/{id}")
    public ElementFunctionality getOne(@PathVariable String id) {
        return elementFunctionalityService.getOne(id);
    }

    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid ElementFunctionality elementFunctionality) {
        elementFunctionalityService.deleteOne(elementFunctionality);
    }
}

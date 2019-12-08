package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.ElementFunctionality;
import pl.raptors.raptorsRobotsApp.service.robots.ElementFunctionalityService;

import javax.validation.Valid;
import java.util.List;

@Controller
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
        return elementFunctionalityService.addOne(elementFunctionality);
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

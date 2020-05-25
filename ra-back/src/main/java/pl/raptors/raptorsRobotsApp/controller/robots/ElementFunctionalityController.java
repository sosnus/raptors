package pl.raptors.raptorsRobotsApp.controller.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import pl.raptors.raptorsRobotsApp.domain.robots.ElementFunctionality;
import pl.raptors.raptorsRobotsApp.service.robots.ElementFunctionalityService;

import javax.validation.Valid;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/robots/element-functionalities")
public class ElementFunctionalityController {

    @Autowired
    ElementFunctionalityService elementFunctionalityService;

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/all")
    public List<ElementFunctionality> getAll() {
        return elementFunctionalityService.getAll();
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/add")
    public ElementFunctionality add(@RequestBody @Valid ElementFunctionality elementFunctionality) {
        if (elementFunctionality.getId() != null) {
            return elementFunctionalityService.updateOne(elementFunctionality);
        } else {
            return elementFunctionalityService.addOne(elementFunctionality);
        }
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @PostMapping("/update")
    public ElementFunctionality update(@RequestBody @Valid ElementFunctionality elementFunctionality) {
        return elementFunctionalityService.updateOne(elementFunctionality);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_REGULAR_USER') or hasAuthority('ROLE_SERVICEMAN') or hasAuthority('ROLE_SUPER_USER')")
    @GetMapping("/{id}")
    public ElementFunctionality getOne(@PathVariable String id) {
        return elementFunctionalityService.getOne(id);
    }

    @PreAuthorize("hasAuthority('ROLE_ADMIN') or hasAuthority('ROLE_SERVICEMAN')")
    @DeleteMapping("/delete")
    public void delete(@RequestBody @Valid ElementFunctionality elementFunctionality) {
        elementFunctionalityService.deleteOne(elementFunctionality);
    }
}

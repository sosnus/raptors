package pl.raptors.ra_back.service.kiosk;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import pl.raptors.ra_back.domain.kiosk.Kiosk;
import pl.raptors.ra_back.domain.tasks.TaskTemplate;
import pl.raptors.ra_back.repository.kiosk.KioskRepository;
import pl.raptors.ra_back.repository.tasks.TaskTemplateRepository;
import pl.raptors.ra_back.service.settings.CurrentMapService;
import pl.raptors.ra_back.service.CRUDService;
// import org.springframework.data.mongodb.core.query.Query;
// import org.springframework.data.mongodb.core.query.Criteria;

import java.util.List;
import java.util.ArrayList;

@Service
public class KioskService implements CRUDService<Kiosk> {

    @Autowired
    KioskRepository kioskRepository;

    @Autowired
    TaskTemplateRepository taskTemlateRepository;

    @Autowired
    CurrentMapService currentMapService;

    @Override
    public Kiosk addOne(Kiosk kiosk) {
        return kioskRepository.save(kiosk);
    }

    @Override
    public Kiosk getOne(String id) {
        return kioskRepository.findById(id).orElse(null);
    }

    @Override
    public List<Kiosk> getAll() {
        return kioskRepository.findAll();
    }

    @Override
    public Kiosk updateOne(Kiosk kiosk) {
        return kioskRepository.save(kiosk);
    }

    @Override
    public void deleteOne(Kiosk kiosk) {
        kioskRepository.delete(kiosk);
    }

    @Override
    public void deleteAll(List<Kiosk> kioskList) {
        for (Kiosk kiosk : kioskList) {
            this.deleteOne(kiosk);
        }
    }

    public List<TaskTemplate> getTasks(String id) {
        // Query query = new Query();
        // List<Criteria> criteria = new ArrayList<>();
        String mapId = currentMapService.getAll().get(0).getMapId();

        Example<TaskTemplate> example = Example.of(new TaskTemplate(null, null, null, id, mapId), ExampleMatcher.matchingAll().withIgnoreNullValues().withIgnorePaths(new String[] { "id", "name", "behaviours", "priority" }));

        // query.addCriteria(new Criteria().andOperator(criteria.toArray(new Criteria[criteria.size()])));
        return taskTemlateRepository.findAll(example);
        // findAll(query).orElse(null);
    }

}

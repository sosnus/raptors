package pl.raptors.raptorsRobotsApp.service.settings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.settings.CurrentMap;
import pl.raptors.raptorsRobotsApp.repository.settings.CurrentMapRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

@Service
public class CurrentMapService implements CRUDService<CurrentMap> {

    @Autowired
    private CurrentMapRepository currentMapRepository;

    @Override
    public CurrentMap addOne(CurrentMap currentMap) {
        return null;
    }

    @Override
    public CurrentMap getOne(String id) {
        return null;
    }

    @Override
    public List<CurrentMap> getAll() {
        return currentMapRepository.findAll();
    }

    @Override
    public CurrentMap updateOne(CurrentMap currentMap) {
        return currentMapRepository.save(currentMap);
    }

    @Override
    public void deleteOne(CurrentMap currentMap) {

    }

    @Override
    public void deleteAll(List<CurrentMap> t) {

    }
}

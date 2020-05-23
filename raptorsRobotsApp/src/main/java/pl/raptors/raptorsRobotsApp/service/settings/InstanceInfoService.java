package pl.raptors.raptorsRobotsApp.service.settings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.robots.Robot;
import pl.raptors.raptorsRobotsApp.domain.settings.InstanceInfo;
import pl.raptors.raptorsRobotsApp.repository.settings.InstanceInfoRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InstanceInfoService implements CRUDService<InstanceInfo> {

    @Autowired
    private InstanceInfoRepository instanceInfoRepository;

    @Override
    public InstanceInfo addOne(InstanceInfo instanceInfo) {
        return null;
    }

    @Override
    public InstanceInfo getOne(String id) {
        return null;
    }

    @Override
    public List<InstanceInfo> getAll() {
        return instanceInfoRepository.findAll();
    }

    @Override
    public InstanceInfo updateOne(InstanceInfo instanceInfo) {
        return instanceInfoRepository.save(instanceInfo);
    }

    @Override
    public void deleteOne(InstanceInfo instanceInfo) {

    }

    @Override
    public void deleteAll(List<InstanceInfo> t) {

    }
}

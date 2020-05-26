package pl.raptors.ra_back.service.settings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.settings.InstanceInfo;
import pl.raptors.ra_back.repository.settings.InstanceInfoRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.util.List;

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

package pl.raptors.ra_back.service.tasks;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.robots.Behaviour;
import pl.raptors.ra_back.domain.robots.Robot;
import pl.raptors.ra_back.domain.tasks.KioskTaskMapping;
import pl.raptors.ra_back.domain.type.TaskPriority;
import pl.raptors.ra_back.repository.tasks.KioskTaskMappingRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.util.List;

@Service
public class KioskTaskMappingService implements CRUDService<KioskTaskMapping> {

    @Autowired
    KioskTaskMappingRepository kioskTaskMappingRepository;

    @Override
    public KioskTaskMapping addOne(KioskTaskMapping kioskTaskMaping) {
        return kioskTaskMappingRepository.save(kioskTaskMaping);
    }

    @Override
    public KioskTaskMapping getOne(String id) {
        return kioskTaskMappingRepository.findById(id).orElse(null);
    }

    @Override
    public List<KioskTaskMapping> getAll() {
        return kioskTaskMappingRepository.findAll();
    }

    @Override
    public KioskTaskMapping updateOne(KioskTaskMapping kioskTaskMaping) {
        return kioskTaskMappingRepository.save(kioskTaskMaping);
    }

    @Override
    public void deleteOne(KioskTaskMapping kioskTaskMaping) {
        kioskTaskMappingRepository.delete(kioskTaskMaping);
    }

    @Override
    public void deleteAll(List<KioskTaskMapping> kioskTaskMapingList) {
        for (KioskTaskMapping kioskTaskMaping : kioskTaskMapingList) {
            this.deleteOne(kioskTaskMaping);
        }
    }
}

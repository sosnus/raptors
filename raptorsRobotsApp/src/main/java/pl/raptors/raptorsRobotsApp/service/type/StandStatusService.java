package pl.raptors.raptorsRobotsApp.service.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.type.StandStatus;
import pl.raptors.raptorsRobotsApp.domain.type.StandStatus;
import pl.raptors.raptorsRobotsApp.repository.type.StandStatusRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;
import java.util.Objects;

@Service
public class StandStatusService implements CRUDService<StandStatus> {
    
    @Autowired
    StandStatusRepository standStatusRepository;

    @Override
    public StandStatus addOne(StandStatus StandStatus) {
        StandStatus standStatusAlreadyExists = standStatusRepository.findByName(StandStatus.getName());
        if (Objects.isNull((standStatusAlreadyExists))) {
            standStatusRepository.save(StandStatus);
            return StandStatus;
        }
        return standStatusAlreadyExists;
    }

    @Override
    public StandStatus getOne(String id) {
        return standStatusRepository.findById(id).orElse(null);
    }

    @Override
    public List<StandStatus> getAll() {
        return standStatusRepository.findAll();
    }

    @Override
    public StandStatus updateOne(StandStatus StandStatus) {
        return standStatusRepository.save(StandStatus);
    }

    @Override
    public void deleteOne(StandStatus StandStatus) {
        StandStatus StandStatusToDelete = standStatusRepository.findByName(StandStatus.getName());
        if (!Objects.isNull((StandStatusToDelete))) {
            standStatusRepository.delete(StandStatusToDelete);
        }
    }
}

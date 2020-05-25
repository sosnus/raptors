package pl.raptors.raptorsRobotsApp.service.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.movement.Stand;
import pl.raptors.raptorsRobotsApp.domain.type.StandStatus;
import pl.raptors.raptorsRobotsApp.repository.type.StandStatusRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;
import pl.raptors.raptorsRobotsApp.service.movement.StandService;

import java.util.List;
import java.util.Objects;

@Service
public class StandStatusService implements CRUDService<StandStatus> {

    @Autowired
    StandStatusRepository standStatusRepository;
    @Autowired
    StandService standService;

    @Override
    public StandStatus addOne(StandStatus standStatus) {
        StandStatus standStatusAlreadyExists = standStatusRepository.findByName(standStatus.getName());
        if (Objects.isNull((standStatusAlreadyExists))) {
            standStatusRepository.save(standStatus);
            return standStatus;
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
    public StandStatus updateOne(StandStatus standStatus) {
        List<Stand> standList = standService.getByStandStatus(this.getOne(standStatus.getId()));
        for (Stand stand : standList) {
            stand.setStandStatus(standStatus);
            standService.updateOne(stand);
        }
        return standStatusRepository.save(standStatus);
    }

    @Override
    public void deleteOne(StandStatus standStatus) {
        StandStatus standStatusToDelete = standStatusRepository.findByName(standStatus.getName());
        if (!Objects.isNull((standStatusToDelete))) {
            List<Stand> standList = standService.getByStandStatus(this.getOne(standStatus.getId()));
            standService.deleteAll(standList);
            standStatusRepository.delete(standStatusToDelete);
        }
    }

    @Override
    public void deleteAll(List<StandStatus> standStatusList) {
        for (StandStatus standStatus : standStatusList) {
            this.deleteOne(standStatus);
        }

    }
}

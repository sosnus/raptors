package pl.raptors.ra_back.service.type;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.movement.Stand;
import pl.raptors.ra_back.domain.type.StandStatus;
import pl.raptors.ra_back.repository.type.StandStatusRepository;
import pl.raptors.ra_back.service.CRUDService;
import pl.raptors.ra_back.service.movement.StandService;

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

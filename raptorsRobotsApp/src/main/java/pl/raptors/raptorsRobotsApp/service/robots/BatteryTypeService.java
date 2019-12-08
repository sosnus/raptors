package pl.raptors.raptorsRobotsApp.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.robots.BatteryType;
import pl.raptors.raptorsRobotsApp.repository.robots.BatteryTypeRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

@Service
public class BatteryTypeService implements CRUDService<BatteryType> {

    @Autowired
    BatteryTypeRepository batteryTypeRepository;

    @Override
    public BatteryType addOne(BatteryType batteryType) {
        return batteryTypeRepository.save(batteryType);
    }

    @Override
    public BatteryType getOne(String id) {
        return batteryTypeRepository.findById(id).orElse(null);
    }

    @Override
    public List<BatteryType> getAll() {
        return batteryTypeRepository.findAll();
    }

    @Override
    public BatteryType updateOne(BatteryType batteryType) {
        return batteryTypeRepository.save(batteryType);
    }

    @Override
    public void deleteOne(BatteryType batteryType) {
        batteryTypeRepository.delete(batteryType);
    }
}

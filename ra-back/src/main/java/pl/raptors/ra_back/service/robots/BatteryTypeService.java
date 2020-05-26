package pl.raptors.ra_back.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.robots.BatteryType;
import pl.raptors.ra_back.domain.robots.RobotBattery;
import pl.raptors.ra_back.domain.robots.RobotModel;
import pl.raptors.ra_back.repository.robots.BatteryTypeRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.util.List;

@Service
public class BatteryTypeService implements CRUDService<BatteryType> {

    @Autowired
    BatteryTypeRepository batteryTypeRepository;
    @Autowired
    RobotBatteryService robotBatteryService;
    @Autowired
    RobotModelService robotModelService;

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
        List<RobotBattery> batteryList = robotBatteryService.getByType(this.getOne(batteryType.getId()));
        List<RobotModel> modelList = robotModelService.getByBatteryType(this.getOne(batteryType.getId()));
        for (RobotBattery battery : batteryList) {
            battery.setType(batteryType);
            robotBatteryService.updateOne(battery);
        }
        for (RobotModel model : modelList) {
            model.setBatteryType(batteryType);
            robotModelService.updateOne(model);
        }
        return batteryTypeRepository.save(batteryType);
    }

    @Override
    public void deleteOne(BatteryType batteryType) {
        List<RobotBattery> batteryList = robotBatteryService.getByType(this.getOne(batteryType.getId()));
        robotBatteryService.deleteAll(batteryList);
        List<RobotModel> modelList = robotModelService.getByBatteryType(this.getOne(batteryType.getId()));
        robotModelService.deleteAll(modelList);
        batteryTypeRepository.delete(batteryType);
    }

    @Override
    public void deleteAll(List<BatteryType> batteryTypeList) {
        for (BatteryType batteryType : batteryTypeList) {
            this.deleteOne(batteryType);
        }
    }
}

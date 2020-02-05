package pl.raptors.raptorsRobotsApp.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.robots.Log;
import pl.raptors.raptorsRobotsApp.repository.robots.LogRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

@Service
public class LogService implements CRUDService<Log> {

    @Autowired
    LogRepository logRepository;

    @Override
    public Log addOne(Log log) {
        return logRepository.save(log);
    }

    @Override
    public Log getOne(String id) {
        return logRepository.findById(id).orElse(null);
    }

    @Override
    public List<Log> getAll() {
        return logRepository.findAll();
    }

    @Override
    public Log updateOne(Log log) {
        return logRepository.save(log);
    }

    @Override
    public void deleteOne(Log log) {
        logRepository.delete(log);
    }

    @Override
    public void deleteAll(List<Log> logList) {
        for (Log log : logList) {
            this.deleteOne(log);
        }
    }
}

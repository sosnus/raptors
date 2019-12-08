package pl.raptors.raptorsRobotsApp.service.robots;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.raptorsRobotsApp.domain.robots.TempParameters;
import pl.raptors.raptorsRobotsApp.repository.robots.TempParametersRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.util.List;

@Service
public class TempParametersService implements CRUDService<TempParameters> {

    @Autowired
    TempParametersRepository tempParametersRepository;

    @Override
    public TempParameters addOne(TempParameters tempParameters) {
        return tempParametersRepository.save(tempParameters);
    }

    @Override
    public TempParameters getOne(String id) {
        return tempParametersRepository.findById(id).orElse(null);
    }

    @Override
    public List<TempParameters> getAll() {
        return tempParametersRepository.findAll();
    }

    @Override
    public TempParameters updateOne(TempParameters tempParameters) {
        return tempParametersRepository.save(tempParameters);
    }

    @Override
    public void deleteOne(TempParameters tempParameters) {
        tempParametersRepository.delete(tempParameters);
    }
}

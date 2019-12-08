package pl.raptors.raptorsRobotsApp.service.movement;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementMap;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementPath;
import pl.raptors.raptorsRobotsApp.repository.movement.MovementMapRepository;
import pl.raptors.raptorsRobotsApp.service.CRUDService;

import java.io.IOException;
import java.util.List;

@Service
public class MovementMapService implements CRUDService<MovementMap> {
    @Autowired
    private MovementMapRepository repository;

    public MovementMap addMovementMap(String name, MultipartFile file) throws IOException {
        Binary binaryMapImage = new Binary(BsonBinarySubType.BINARY, file.getBytes());
        MovementMap movementMap = new MovementMap(name, binaryMapImage);
        movementMap = repository.save(movementMap);
        return movementMap;
    }

    @Override
    public MovementMap addOne(MovementMap movementMap) {
        return repository.save(movementMap);
    }

    @Override
    public MovementMap getOne(String id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<MovementMap> getAll() {
        return repository.findAll();
    }

    @Override
    public MovementMap updateOne(MovementMap movementMap) {
        return repository.save(movementMap);
    }

    @Override
    public void deleteOne(MovementMap movementMap) {
        repository.delete(movementMap);
    }
}

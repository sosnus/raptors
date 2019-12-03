package pl.raptors.raptorsRobotsApp.service.movement;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementMap;
import pl.raptors.raptorsRobotsApp.repository.movement.MovementMapRepository;

import java.io.IOException;

@Service
public class MovementMapService {
    @Autowired
    private MovementMapRepository movementMapRepository;

    public String addMovementMap(String name, MultipartFile file) throws IOException {
        Binary binaryMapImage = new Binary(BsonBinarySubType.BINARY, file.getBytes());
        MovementMap movementMap = new MovementMap(name, binaryMapImage);
        movementMap = movementMapRepository.insert(movementMap);
        return movementMap.getId();
    }

    public MovementMap getMovementMap(String id) {
        return movementMapRepository.findById(id).get();
    }
}

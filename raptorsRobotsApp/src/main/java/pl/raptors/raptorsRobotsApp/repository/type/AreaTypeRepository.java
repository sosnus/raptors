package pl.raptors.raptorsRobotsApp.repository.type;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.type.AreaType;


@Repository
public interface AreaTypeRepository extends MongoRepository<AreaType,String> {
    public AreaType findByName(String name);
}

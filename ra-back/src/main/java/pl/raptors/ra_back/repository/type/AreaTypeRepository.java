package pl.raptors.ra_back.repository.type;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.type.AreaType;


@Repository
public interface AreaTypeRepository extends MongoRepository<AreaType,String> {
    public AreaType findByName(String name);
}

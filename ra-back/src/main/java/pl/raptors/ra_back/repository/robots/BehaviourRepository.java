package pl.raptors.ra_back.repository.robots;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.robots.Behaviour;

@Repository
public interface BehaviourRepository  extends MongoRepository<Behaviour, String>
{
}

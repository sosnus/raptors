package pl.raptors.raptorsRobotsApp.repository.settings;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.raptorsRobotsApp.domain.settings.ContactInfo;

@Repository
public interface ContactInfoRepository extends MongoRepository<ContactInfo, String> {
}

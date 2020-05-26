package pl.raptors.ra_back.repository.settings;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import pl.raptors.ra_back.domain.settings.ContactInfo;

@Repository
public interface ContactInfoRepository extends MongoRepository<ContactInfo, String> {
}

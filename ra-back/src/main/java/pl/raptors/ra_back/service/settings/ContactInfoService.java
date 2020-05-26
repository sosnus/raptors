package pl.raptors.ra_back.service.settings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.settings.ContactInfo;
import pl.raptors.ra_back.repository.settings.ContactInfoRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.util.List;

@Service
public class ContactInfoService implements CRUDService<ContactInfo> {

    @Autowired
    private ContactInfoRepository contactInfoRepository;

    @Override
    public ContactInfo addOne(ContactInfo contactInfo) {
        return null;
    }

    @Override
    public ContactInfo getOne(String id) {
        return null;
    }

    @Override
    public List<ContactInfo> getAll() {
        return contactInfoRepository.findAll();
    }

    @Override
    public ContactInfo updateOne(ContactInfo contactInfo) {
        return contactInfoRepository.save(contactInfo);
    }

    @Override
    public void deleteOne(ContactInfo contactInfo) {

    }

    @Override
    public void deleteAll(List<ContactInfo> t) {

    }
}

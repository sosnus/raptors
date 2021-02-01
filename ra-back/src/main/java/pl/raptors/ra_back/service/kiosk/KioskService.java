package pl.raptors.ra_back.service.kiosk;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pl.raptors.ra_back.domain.kiosk.Kiosk;
import pl.raptors.ra_back.repository.kiosk.KioskRepository;
import pl.raptors.ra_back.service.CRUDService;

import java.util.List;


@Service
public class KioskService implements CRUDService<Kiosk> {

    @Autowired
    KioskRepository kioskRepository;

    @Override
    public Kiosk addOne(Kiosk kiosk) {
        return kioskRepository.save(kiosk);
    }

    @Override
    public Kiosk getOne(String id) {
        return kioskRepository.findById(id).orElse(null);
    }

    @Override
    public List<Kiosk> getAll() {
        return kioskRepository.findAll();
    }

    @Override
    public Kiosk updateOne(Kiosk kiosk) {
        return kioskRepository.save(kiosk);
    }

    @Override
    public void deleteOne(Kiosk kiosk) {
        kioskRepository.delete(kiosk);
    }

    @Override
    public void deleteAll(List<Kiosk> kioskList) {
        for (Kiosk kiosk : kioskList) {
            this.deleteOne(kiosk);
        }
    }
}

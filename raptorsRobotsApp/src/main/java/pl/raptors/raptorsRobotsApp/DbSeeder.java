package pl.raptors.raptorsRobotsApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pl.raptors.raptorsRobotsApp.domain.Role;
import pl.raptors.raptorsRobotsApp.domain.User;
import pl.raptors.raptorsRobotsApp.domain.enums.PropulsionType;
import pl.raptors.raptorsRobotsApp.domain.movement.*;
import pl.raptors.raptorsRobotsApp.domain.robots.*;
import pl.raptors.raptorsRobotsApp.repository.RoleRepository;
import pl.raptors.raptorsRobotsApp.repository.UserRepository;
import pl.raptors.raptorsRobotsApp.repository.movement.*;
import pl.raptors.raptorsRobotsApp.repository.robots.*;


import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static pl.raptors.raptorsRobotsApp.domain.enums.AreaType.FORBIDDEN;
import static pl.raptors.raptorsRobotsApp.domain.enums.ParkingType.DETAILED;
import static pl.raptors.raptorsRobotsApp.domain.enums.PropulsionType.TODO;
import static pl.raptors.raptorsRobotsApp.domain.enums.ReviewType.SERVICE_CALL;
import static pl.raptors.raptorsRobotsApp.domain.enums.StandStatus.FREE;
import static pl.raptors.raptorsRobotsApp.domain.enums.StandType.LOADING;

//bedzie to klasa wstawiająca do bazy przykladowego uzytkownika
@Component
public class DbSeeder implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AreaPointRepository areaPointRepository;
    @Autowired
    private CorridorPointRepository corridorPointRepository;
    @Autowired
    private CorridorRepository corridorRepository;
    @Autowired
    private MapAreaRepository mapAreaRepository;
    @Autowired
    private MovementMapRepository movementMapRepository;
    @Autowired
    private MovementPathRepository movementPathRepository;
    @Autowired
        private StandRepository standRepository;
    @Autowired
    private BatteryTypeRepository batteryTypeRepository;
    @Autowired
    private ExtraRobotElementRepository extraRobotElementRepository;
    @Autowired
    private RobotBatteryRepository robotBatteryRepository;
    @Autowired
    private RobotModelRepository robotModelRepository;
    @Autowired
    private RobotRepository robotRepository;
    @Autowired
    private RobotReviewRepository robotReviewRepository;



    @Override
    public void run(String... strings) {

        User testowyUser1 = new User(
                "testowy@gmail.com",
                "test",
                //jeśli więcej niż 1 rola, to Array.asList()
                Collections.singletonList(
                        new Role("regularUser")
                )

        );

        User testowyUser2 = new User(
                "kowalski@gmail.com",
                "test2",
                //jeśli więcej niż 1 rola, to Array.asList()
                Collections.singletonList(
                        new Role("regularUser")
                )

        );

        //wywalanie wszystkich userów
        this.userRepository.deleteAll();

        //wrzucanie utworzonych userów do bazy
        List<User> usersToAdd = Arrays.asList(testowyUser1, testowyUser2);
        this.userRepository.saveAll(usersToAdd);


        //KOLEJNOSC JEST WAZNA

        MovementMap movementMap= new MovementMap(
                "mapkaNazwa",
                "/Desktop/folderMap/mapaWpgm.pgm",
                "/Desktop/folderYaml/yamlPlik.yaml"
        );


        MapArea mapArea= new MapArea(
                "hala A",
                movementMap,
                FORBIDDEN
        );


        AreaPoint areaPoint = new AreaPoint(
                 mapArea,
                3,
                221.40,
                -30.67
        );

        MovementPath movementPath= new MovementPath(
                "droga glówna B",
                45.50,
                13.00
        );

        Corridor corridor= new Corridor(
                "pomost",
                movementPath
        );

        CorridorPoint corridorPoint= new CorridorPoint(
                corridor,
                11,
                99.8,
                111.2
        );

        ExtraRobotElement extraRobotElement= new ExtraRobotElement(
                "jakas dostawka",
                "100cm x 350cm",
                "robienie CZEGOŚ"
        );

        RobotModel robotmModel= new RobotModel(
                "CP-300",
                "500kg",
                "30km/h",
                "200cm",
                "120cm",
                "200cm",
                "30 deg",
                TODO
        );

        Robot robot= new Robot(
                "192.15.0.1",
                true,
                extraRobotElement,
                robotmModel
        );

        BatteryType batteryType = new BatteryType(
                "litowo-jonowa",
                "3200",
                "2.1",
                "9.0"
        );


        RobotBattery robotBattery = new RobotBattery(
                "2016-9-22",
                batteryType
        );

        RobotReview robotReview = new RobotReview(
                robot,
                "2019-3-30",
                "2016-4-25",
                SERVICE_CALL
        );

        Stand stand= new Stand(
                "miejsce ładowania baterii",
                33.21,
                123.54,
                0.0,
                98.0,
                76.4,
                34.34,
                11.0,
                FREE,
                DETAILED,
                LOADING
        );

        //czyść baze
        this.areaPointRepository.deleteAll();
        this.corridorRepository.deleteAll();
        this.corridorPointRepository.deleteAll();
        this.mapAreaRepository.deleteAll();
        this.movementMapRepository.deleteAll();
        this.movementPathRepository.deleteAll();
        this.standRepository.deleteAll();
        this.batteryTypeRepository.deleteAll();
        this.extraRobotElementRepository.deleteAll();
        this.robotBatteryRepository.deleteAll();
        this.robotModelRepository.deleteAll();
        this.robotRepository.deleteAll();
        this.robotReviewRepository.deleteAll();


        //dodaj do bazy dane
        this.movementMapRepository.save(movementMap);
        this.mapAreaRepository.save(mapArea);
        this.areaPointRepository.save(areaPoint);
        this.movementPathRepository.save(movementPath);
        this.corridorRepository.save(corridor);
        this.corridorPointRepository.save(corridorPoint);
        this.extraRobotElementRepository.save(extraRobotElement);
        this.robotModelRepository.save(robotmModel);
        this.robotRepository.save(robot);
        this.batteryTypeRepository.save(batteryType);
        this.robotBatteryRepository.save(robotBattery);
        this.robotReviewRepository.save(robotReview);
        this.standRepository.save(stand);

    }

}

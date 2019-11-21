package pl.raptors.raptorsRobotsApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import pl.raptors.raptorsRobotsApp.domain.Role;
import pl.raptors.raptorsRobotsApp.domain.User;
import pl.raptors.raptorsRobotsApp.domain.enums.PropulsionType;
import pl.raptors.raptorsRobotsApp.domain.movement.*;
import pl.raptors.raptorsRobotsApp.domain.movement.MovementPathPoint;
import pl.raptors.raptorsRobotsApp.domain.robots.*;
import pl.raptors.raptorsRobotsApp.repository.RoleRepository;
import pl.raptors.raptorsRobotsApp.repository.UserRepository;
import pl.raptors.raptorsRobotsApp.repository.movement.*;
import pl.raptors.raptorsRobotsApp.repository.robots.*;


import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static pl.raptors.raptorsRobotsApp.domain.enums.AreaType.FORBIDDEN;
import static pl.raptors.raptorsRobotsApp.domain.enums.BehaviourType.*;
import static pl.raptors.raptorsRobotsApp.domain.enums.ParkingType.DETAILED;
import static pl.raptors.raptorsRobotsApp.domain.enums.PropulsionType.TODO;
import static pl.raptors.raptorsRobotsApp.domain.enums.ReviewType.SERVICE_CALL;
import static pl.raptors.raptorsRobotsApp.domain.enums.RobotStatus.TODO_ROBOT_STATUS;
import static pl.raptors.raptorsRobotsApp.domain.enums.RoutePriority.TODO_PRIORITY;
import static pl.raptors.raptorsRobotsApp.domain.enums.StandStatus.FREE;
import static pl.raptors.raptorsRobotsApp.domain.enums.StandType.LOADING;
import static pl.raptors.raptorsRobotsApp.domain.enums.StandType.CHARGING;
import static pl.raptors.raptorsRobotsApp.domain.enums.TaskPriority.TODO_TASK_PRIORITY;

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
    @Autowired
    private MovementPathPointRepository movementPathPointRepository;
    @Autowired
    private PathPointRepository pathPointRepository;
    @Autowired
    private RouteRepository routeRepository;
    @Autowired
    private BehaviourRepository behaviourRepository;
    @Autowired
    private RobotTaskRepository robotTaskRepository;
    @Autowired
    private TempParametersRepository tempParametersRepository;


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

        MovementPath movementPath=new MovementPath("droga glówna B");

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
                CHARGING
        );

        Stand stand2= new Stand(
                "mnagazyn",
                55.21,
                133.54,
                1.0,
                88.0,
                72.4,
                86.34,
                33.0,
                FREE,
                DETAILED,
                LOADING
        );

        MovementPathPoint movementPathPoint= new MovementPathPoint(
                movementPath,
                20,
                43.2,
                50.2
        );

        PathPoint pathPoint= new PathPoint(
                movementPath,
                1,
                10.05,
                355.124
        );

        Route route= new Route(
                movementMap,
                movementPath,
                corridor,
                "najszybsza główna",
                stand2,
                stand,
                TODO_PRIORITY
        );

        Behaviour behaviour= new Behaviour(
                WAIT,
                "* WILL BE JSON *"
        );

        Behaviour behaviour2= new Behaviour(
                GO_TO,
                "* WILL BE JSON *"
        );

        Behaviour behaviour3= new Behaviour(
                DOCKAGE,
                "* WILL BE JSON *"
        );


        List<Behaviour> behaviours= new ArrayList();
        behaviours.add(behaviour);
        behaviours.add(behaviour2);
        behaviours.add(behaviour3);

        RobotTask robotTask= new RobotTask(
                "transport tools",
                behaviours,
                "2019-6-21 16:00",
                TODO_TASK_PRIORITY
        );

        TempParameters tempParameters= new TempParameters(
                "magazyn-hala C3",
                77.4,
                TODO_ROBOT_STATUS
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
        this.movementPathPointRepository.deleteAll();
        this.pathPointRepository.deleteAll();
        this.routeRepository.deleteAll();
        this.behaviourRepository.deleteAll();
        this.robotTaskRepository.deleteAll();
        this.tempParametersRepository.deleteAll();

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
        this.standRepository.save(stand2);
        this.movementPathPointRepository.save(movementPathPoint);
        this.pathPointRepository.save(pathPoint);
        this.routeRepository.save(route);
        this.behaviourRepository.save(behaviour);
        this.behaviourRepository.save(behaviour2);
        this.behaviourRepository.save(behaviour3);
        this.robotTaskRepository.save(robotTask);
        this.tempParametersRepository.save(tempParameters);
    }

}

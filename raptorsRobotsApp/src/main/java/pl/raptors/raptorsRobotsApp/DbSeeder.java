package pl.raptors.raptorsRobotsApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.gridfs.GridFsOperations;
import org.springframework.stereotype.Component;
import pl.raptors.raptorsRobotsApp.domain.accounts.Role;
import pl.raptors.raptorsRobotsApp.domain.accounts.User;
import pl.raptors.raptorsRobotsApp.domain.graphs.Edge;
import pl.raptors.raptorsRobotsApp.domain.graphs.Graph;
import pl.raptors.raptorsRobotsApp.domain.graphs.Vertex;
import pl.raptors.raptorsRobotsApp.domain.movement.*;
import pl.raptors.raptorsRobotsApp.domain.robots.*;
import pl.raptors.raptorsRobotsApp.domain.type.*;
import pl.raptors.raptorsRobotsApp.repository.accounts.RoleRepository;
import pl.raptors.raptorsRobotsApp.repository.accounts.UserRepository;
import pl.raptors.raptorsRobotsApp.repository.graphs.EdgeRepository;
import pl.raptors.raptorsRobotsApp.repository.graphs.GraphRepository;
import pl.raptors.raptorsRobotsApp.repository.graphs.VertexRepository;
import pl.raptors.raptorsRobotsApp.repository.movement.*;
import pl.raptors.raptorsRobotsApp.repository.robots.*;
import pl.raptors.raptorsRobotsApp.repository.type.*;
import pl.raptors.raptorsRobotsApp.service.accounts.RoleService;
import pl.raptors.raptorsRobotsApp.service.accounts.UserService;
import pl.raptors.raptorsRobotsApp.service.graphs.GraphService;
import pl.raptors.raptorsRobotsApp.service.movement.CorridorService;
import pl.raptors.raptorsRobotsApp.service.movement.MovementMapService;
import pl.raptors.raptorsRobotsApp.service.movement.MovementPathService;
import pl.raptors.raptorsRobotsApp.service.robots.*;
import pl.raptors.raptorsRobotsApp.service.type.*;


import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

//klasa wstawiająca do bazy wstepne przykladowe dane
@Component
public class DbSeeder implements CommandLineRunner {

    //REPOS
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
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
    private ElementFunctionalityRepository elementFunctionalityRepository;
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
    private RouteRepository routeRepository;
    @Autowired
    private BehaviourRepository behaviourRepository;
    @Autowired
    private RobotTaskRepository robotTaskRepository;
    @Autowired
    private GraphRepository graphRepository;
    @Autowired
    private EdgeRepository edgeRepository;
    @Autowired
    private VertexRepository vertexRepository;
    @Autowired
    private AreaTypeRepository areaTypeRepository;
    @Autowired
    private ParkingTypeRepository parkingTypeRepository;
    @Autowired
    private PropulsionTypeRepository propulsionTypeRepository;
    @Autowired
    private ReviewTypeRepository reviewTypeRepository;
    @Autowired
    private RobotStatusRepository robotStatusRepository;
    @Autowired
    private RoutePriorityRepository routePriorityRepository;
    @Autowired
    private StandStatusRepository standStatusRepository;
    @Autowired
    private StandTypeRepository standTypeRepository;
    @Autowired
    private TaskPriorityRepository taskPriorityRepository;
    @Autowired
    private LogRepository logRepository;

    //SERVICES
    @Autowired
    private GraphService graphService;
    @Autowired
    private AreaTypeService areaTypeService;
    @Autowired
    private MovementMapService movementMapService;
    @Autowired
    private MovementPathService movementPathService;
    @Autowired
    private CorridorService corridorService;
    @Autowired
    private RoutePriorityService routePriorityService;
    @Autowired
    private ParkingTypeService parkingTypeService;
    @Autowired
    private StandTypeService standTypeService;
    @Autowired
    private StandStatusService standStatusService;
    @Autowired
    private ElementFunctionalityService elementFunctionalityService;
    @Autowired
    private ExtraRobotElementService extraRobotElementService;
    @Autowired
    private RobotModelService robotModelService;
    @Autowired
    private RobotBatteryService robotBatteryService;
    @Autowired
    private RobotStatusService robotStatusService;
    @Autowired
    private BatteryTypeService batteryTypeService;
    @Autowired
    private PropulsionTypeService propulsionTypeService;
    @Autowired
    private RobotService robotService;
    @Autowired
    private ReviewTypeService reviewTypeService;
    @Autowired
    private BehaviourService behaviourService;
    @Autowired
    private TaskPriorityService taskPriorityService;
    @Autowired
    private UserService userService;
    @Autowired
    private RoleService roleService;


    @Autowired
    private GridFsOperations gridFsOperations;


    @Override
    public void run(String... strings) throws IOException {

        // this.corridorRepository.deleteAll();
        //this.movementPathRepository.deleteAll();

        Role regularUserRole = new Role("ROLE_REGULAR_USER");
        Role superUserRole = new Role("ROLE_SUPER_USER");
        Role adminRole = new Role("ROLE_ADMIN");
        Role servicemanRole = new Role("ROLE_SERVICEMAN");
        Role robotRole = new Role("ROLE_ROBOT");

/*        this.roleRepository.deleteAll();
        this.roleService.addOne(regularUserRole);
        this.roleService.addOne(superUserRole);
        this.roleService.addOne(adminRole);
        this.roleService.addOne(servicemanRole);
        this.roleService.addOne(robotRole);*/

        User testowyUser1 = new User("user@mail.com", "user",
                //jeśli więcej niż 1 rola, to Array.asList()
                Collections.singletonList(regularUserRole.getId())

        );

        User testowyServiceman1 = new User("serviceman@mail.com", "serviceman",
                //jeśli więcej niż 1 rola, to Array.asList()
                Arrays.asList(servicemanRole.getId(),regularUserRole.getId())

        );
        User testowySuperUser1 = new User("superuser@mail.com", "superuser", Arrays.asList(superUserRole.getId(),regularUserRole.getId()));
        User testowyAdmin1 = new User("admin@mail.com", "admin", Collections.singletonList(adminRole.getId()));
        User testowyRobot1 = new User("robot@mail.com", "robot", Collections.singletonList(robotRole.getId()));

        List<User> usersToAdd = Arrays.asList(testowyUser1,testowySuperUser1, testowyServiceman1, testowyRobot1,testowyAdmin1);

/*        this.userRepository.deleteAll();
        this.userService.addOne(testowyUser1);
        this.userService.addOne(testowySuperUser1);
        this.userService.addOne(testowyServiceman1);
        this.userService.addOne(testowyRobot1);
        this.userService.addOne(testowyAdmin1);*/

        //GRAFY
        Vertex vertex1 = new Vertex(17.5, 25.0, "A");
        Vertex vertex2 = new Vertex(15.0, 20.0, "B");
        Vertex vertex3 = new Vertex(20.0, 20.0, "C");
        Vertex vertex4 = new Vertex(15.0, 15.0, "D");
        Vertex vertex5 = new Vertex(20.0, 15.0, "E");

        Edge edge1 = new Edge(vertex1, vertex2, false);
        Edge edge2 = new Edge(vertex1, vertex3, false);
        Edge edge3 = new Edge(vertex2, vertex4, false);
        Edge edge4 = new Edge(vertex3, vertex5, false);

        List<Vertex> verticesToAdd = Arrays.asList(vertex1, vertex2, vertex3, vertex4, vertex5);
        List<Edge> edgesToAdd = Arrays.asList(edge1, edge2, edge3, edge4);

        Graph graph = new Graph(edgesToAdd);

/*        this.vertexRepository.deleteAll();
        this.edgeRepository.deleteAll();
        this.graphRepository.deleteAll();*/

        //this.vertexRepository.saveAll(verticesToAdd);
        //this.edgeRepository.saveAll(edgesToAdd);
        //this.graphRepository.save(graph);
        /*        this.graphService.addOne(graph);*/


        //KOLEJNOSC JEST WAZNA

        MovementMap movementMap = new MovementMap("mapkaNazwa", null, null);
        MovementMap movementMap1 = new MovementMap("drugaMapa", null, null);

        AreaType areaType = new AreaType("warehouse", "#0000FF");
        AreaType areaType1 = new AreaType("outside", "#FF0000");

        MapArea mapArea = new MapArea("hall A2", movementMap, areaType);
        MapArea mapArea1 = new MapArea("area B13", movementMap1, areaType1);

        UniversalPoint movementPathUniversalPoint = new UniversalPoint(43.2, 50.2, 0);
        UniversalPoint movementPathUniversalPoint1 = new UniversalPoint(22.2, 30.5, 0);
        List<UniversalPoint> universalPoints = new ArrayList<>();
        universalPoints.add(movementPathUniversalPoint);
        universalPoints.add(movementPathUniversalPoint1);

        UniversalPoint movementPathUniversalPoint2 = new UniversalPoint(22.2, 22.2, 0);
        UniversalPoint movementPathUniversalPoint3 = new UniversalPoint(30.2, 22, 0);
        List<UniversalPoint> universalPoints1 = new ArrayList<>();
        universalPoints1.add(movementPathUniversalPoint2);
        universalPoints1.add(movementPathUniversalPoint3);

        StandType standType = new StandType("receiving");
        StandType standType1 = new StandType("loading");

        StandType standType3 = new StandType("charger");
        StandType standType4 = new StandType("receiving-loading");
        StandType standType5 = new StandType("parking");

        StandStatus standStatus = new StandStatus("free");
        StandStatus standStatus1 = new StandStatus("occupied");

        ParkingType parkingType = new ParkingType("rough parking");
        ParkingType parkingType1 = new ParkingType("exact parking");

        Pose pose = new Pose();
        pose.setOrientation(new Pose.Orientation(0.15, 0.54, 0.0, 1));
        pose.setPosition(new UniversalPoint(13.0, 66.6, 22.3));
        Stand stand = new Stand("charging station", pose, parkingType1, standType3, standStatus1);

        Pose pose1 = new Pose();
        pose1.setOrientation(new Pose.Orientation(1.0, 0.4, 0.0, 1));
        pose1.setPosition(new UniversalPoint(135.0, 8.6, 28.8));
        Stand stand1 = new Stand("warehouse", pose1, parkingType1, standType1, standStatus1);

        Pose pose2 = new Pose();
        pose2.setOrientation(new Pose.Orientation(0.8, 1.0, 0.0, 1.0));
        pose2.setPosition(new UniversalPoint(98.0, 76.4, 34.34));
        Stand stand2 = new Stand("parking B", pose2, parkingType, standType5, standStatus);

        //create movement paths with empty lists
        MovementPath movementPath = new MovementPath("do magazynu", universalPoints,stand1.getId(),stand2.getId());
        MovementPath movementPath1 = new MovementPath("do taśmy produkcyjnej", universalPoints1,stand1.getId(),stand2.getId());
        //save movement paths
        // movementPath = this.movementPathRepository.save(movementPath);
        // movementPath1 = this.movementPathRepository.save(movementPath1);

        Corridor corridor = new Corridor("bridge", movementPath.getId(), universalPoints);
        Corridor corridor1 = new Corridor("main hall", movementPath1.getId(), universalPoints1);

        //this.corridorRepository.save(corridor);
        //this.corridorRepository.save(corridor1);

        ExtraRobotElement extraRobotElement = new ExtraRobotElement("jakas dostawka", "100cm x 350cm");
        ExtraRobotElement extraRobotElement1 = new ExtraRobotElement("pliers", "300cm x 250cm");

        PropulsionType propulsionType = new PropulsionType("mechanical drive");
        PropulsionType propulsionType1 = new PropulsionType("electric drive");

        BatteryType batteryType = new BatteryType("Lithium Ion", "3200", "2.1", "9.0");
        BatteryType batteryType1 = new BatteryType("Solar", "5200", "2.1", "5.0");

        RobotModel robotmModel = new RobotModel("C3P0", "300kg", "40km/h", "70cm", "120cm", "150cm", "45 deg", propulsionType1, batteryType1);
        RobotModel robotmModel1 = new RobotModel("R2D2", "500kg", "20km/h", "200cm", "250cm", "200cm", "30 deg", propulsionType, batteryType);


        RobotStatus robotStatus = new RobotStatus("on the way");
        RobotStatus robotStatus1 = new RobotStatus("charging needed");
        RobotStatus robotStatus2 = new RobotStatus("free");

        List<RobotStatus> robotStatuses = new ArrayList<>();
        robotStatuses.add(robotStatus);


        List<RobotStatus> robotStatuses1 = new ArrayList<>();
        robotStatuses1.add(robotStatus1);
        robotStatuses1.add(robotStatus2);

        //format czasu
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");

        Robot robot = new Robot("192.15.0.1", false, extraRobotElement1, robotmModel, pose1, formatter.format(new Date()), 77.4, robotStatuses1);
        Robot robot1 = new Robot("192.15.0.2", true, extraRobotElement1, robotmModel1, pose2, formatter.format(new Date()), 16.9, robotStatuses1);
        Robot robot2 = new Robot("192.15.0.3", true, extraRobotElement, robotmModel, pose, formatter.format(new Date()), 99.8, robotStatuses);

        Log log = new Log(robot, formatter.format(new Date()), robotStatus);
        Log log1 = new Log(robot1, formatter.format(new Date()), robotStatus1);
        Log log2 = new Log(robot2, formatter.format(new Date()), robotStatus2);

        RobotBattery robotBattery = new RobotBattery("2016-9-22", batteryType);
        RobotBattery robotBattery1 = new RobotBattery("2013-4-15", batteryType1);

        ReviewType reviewType = new ReviewType("service call");
        ReviewType reviewType1 = new ReviewType("periodic");

        RobotReview robotReview = new RobotReview(robot, "2019-3-30", "2016-4-25", reviewType);
        RobotReview robotReview1 = new RobotReview(robot1, "2020-5-10", "2018-7-17", reviewType1);
        RobotReview robotReview2 = new RobotReview(robot2, "2020-12-11", "2018-12-12", reviewType1);

        RoutePriority routePriority = new RoutePriority("critical", 1);
        RoutePriority routePriority1 = new RoutePriority("important", 2);

        // routePriority = routePriorityRepository.save(routePriority);
        // routePriority1 = routePriorityRepository.save(routePriority1);

        Route route = new Route(movementMap.getId(), movementPath.getId(), corridor.getId(), "red route", stand2, stand, routePriority.getId());
        Route route1 = new Route(movementMap1.getId(), movementPath1.getId(), corridor1.getId(), "yellow route", stand1, stand2, routePriority1.getId());

        //this.routeRepository.save(route);
        //this.routeRepository.save(route1);

        Behaviour behaviour = new Behaviour("WAIT", "* WILL BE JSON *");
        Behaviour behaviour2 = new Behaviour("GO_TO", "* WILL BE JSON *");
        Behaviour behaviour3 = new Behaviour("DOCKING", "* WILL BE JSON *");


        List<Behaviour> behaviours = new ArrayList();
        behaviours.add(behaviour2);
        behaviours.add(behaviour3);

        List<Behaviour> behaviours1 = new ArrayList();
        behaviours.add(behaviour);

        List<Behaviour> behaviours2 = new ArrayList();
        behaviours.add(behaviour);
        behaviours.add(behaviour2);
        behaviours.add(behaviour3);


        TaskPriority taskPriority = new TaskPriority("critical", 1);
        TaskPriority taskPriority1 = new TaskPriority("important", 2);
        TaskPriority taskPriority2 = new TaskPriority("medium", 3);


        RobotTask robotTask = new RobotTask(robot, "transport tools", behaviours, formatter.format(new Date()), taskPriority, "done", testowyUser1.getId());
        RobotTask robotTask1 = new RobotTask(null, "deliver package", behaviours1, formatter.format(new Date()), taskPriority1, "waiting", testowySuperUser1.getId());
        RobotTask robotTask2 = new RobotTask(robot2, "receive package", behaviours2, formatter.format(new Date()), taskPriority2, "on going", testowyServiceman1.getId());
        RobotTask robotTask3 = new RobotTask(robot1, "receive package", behaviours1, formatter.format(new Date()), taskPriority2, "on going", testowyAdmin1.getId());

/*        this.robotTaskRepository.deleteAll();
        this.robotTaskRepository.save(robotTask);
        this.robotTaskRepository.save(robotTask1);
        this.robotTaskRepository.save(robotTask2);
        this.robotTaskRepository.save(robotTask3);*/

        //czyść baze
        /*
        this.mapAreaRepository.deleteAll();
        //this.movementMapRepository.deleteAll();
        this.standRepository.deleteAll();
        this.batteryTypeRepository.deleteAll();
        this.elementFunctionalityRepository.deleteAll();
        this.extraRobotElementRepository.deleteAll();
        this.robotBatteryRepository.deleteAll();
        this.robotModelRepository.deleteAll();
        this.robotRepository.deleteAll();
        this.robotReviewRepository.deleteAll();
        this.behaviourRepository.deleteAll();
        this.robotTaskRepository.deleteAll();
        this.logRepository.deleteAll();
        //type
        this.areaTypeRepository.deleteAll();
        this.parkingTypeRepository.deleteAll();
        this.propulsionTypeRepository.deleteAll();
        this.reviewTypeRepository.deleteAll();
        this.robotStatusRepository.deleteAll();
        this.standStatusRepository.deleteAll();
        this.standTypeRepository.deleteAll();
        this.taskPriorityRepository.deleteAll();

        //dodaj do bazy dane
        //type
        this.areaTypeRepository.save(areaType);
        this.areaTypeRepository.save(areaType1);
        this.parkingTypeRepository.save(parkingType);
        this.parkingTypeRepository.save(parkingType1);
        this.propulsionTypeRepository.save(propulsionType);
        this.propulsionTypeRepository.save(propulsionType1);
        this.reviewTypeRepository.save(reviewType);
        this.reviewTypeRepository.save(reviewType1);
        this.robotStatusRepository.save(robotStatus);
        this.robotStatusRepository.save(robotStatus1);
        this.robotStatusRepository.save(robotStatus2);
        this.routePriorityRepository.save(routePriority);
        this.routePriorityRepository.save(routePriority1);
        this.standStatusRepository.save(standStatus);
        this.standStatusRepository.save(standStatus1);
        this.standTypeRepository.save(standType);
        this.standTypeRepository.save(standType1);
        this.standTypeRepository.save(standType3);
        this.standTypeRepository.save(standType4);
        this.standTypeRepository.save(standType5);
        this.taskPriorityRepository.save(taskPriority);
        this.taskPriorityRepository.save(taskPriority1);

        //this.movementMapRepository.save(movementMap);//
        this.mapAreaRepository.save(mapArea);
        this.mapAreaRepository.save(mapArea1);
        this.extraRobotElementRepository.save(extraRobotElement);
        this.extraRobotElementRepository.save(extraRobotElement1);
        this.robotModelRepository.save(robotmModel);
        this.robotModelRepository.save(robotmModel1);
        this.robotRepository.save(robot);
        this.robotRepository.save(robot1);
        this.robotRepository.save(robot2);
        this.logRepository.save(log);
        this.logRepository.save(log1);
        this.logRepository.save(log2);
        this.batteryTypeRepository.save(batteryType);
        this.batteryTypeRepository.save(batteryType1);
        this.robotBatteryRepository.save(robotBattery);
        this.robotBatteryRepository.save(robotBattery1);
        this.robotReviewRepository.save(robotReview);
        this.robotReviewRepository.save(robotReview1);
        this.robotReviewRepository.save(robotReview2);
        this.standRepository.save(stand);
        this.standRepository.save(stand1);
        this.standRepository.save(stand2);
        this.behaviourRepository.save(behaviour);
        this.behaviourRepository.save(behaviour2);
        this.behaviourRepository.save(behaviour3);
        this.robotTaskRepository.save(robotTask);
        this.robotTaskRepository.save(robotTask1);
        this.robotTaskRepository.save(robotTask2);
*/
        //KEEP COMMENTED! ---TESTING CASCADE UPDATES/DELETES--- KEEP COMMENTED!

        //MOVEMENT
       /* movementMap.setName("test1");
        areaType.setName("test1");

        movementPath.setName("test2");

        corridor.setName("test3");

        routePriority.setName("test4");

        parkingType.setName("test5");
        standType1.setName("test6");
        standStatus.setName("test7");

        this.areaTypeService.updateOne(areaType);
        //this.movementMapService.updateOne(movementMap);

        this.corridorService.updateOne(corridor);
        this.movementPathService.updateOne(movementPath);


        this.routePriorityService.updateOne(routePriority);

        this.parkingTypeService.updateOne(parkingType);
        this.standTypeService.updateOne(standType1);
        this.standStatusService.updateOne(standStatus);*/

        //this.corridorService.deleteOne(corridor);
        //this.movementMapService.deleteOne(movementMap);

        //ROBOTS
        /*ElementFunctionality elementFunctionality = new ElementFunctionality("nazwa1");
        ElementFunctionality elementFunctionality1 = new ElementFunctionality("nazwa2");
        ElementFunctionality elementFunctionality2 = new ElementFunctionality("nazwa3");
        List<ElementFunctionality> functionalitiesToAdd = Arrays.asList(elementFunctionality, elementFunctionality1, elementFunctionality2);

        this.elementFunctionalityRepository.saveAll(functionalitiesToAdd);

        ExtraRobotElement extraRobotElement2 = new ExtraRobotElement("element1", "12 x 340", functionalitiesToAdd);
        ExtraRobotElement extraRobotElement3 = new ExtraRobotElement("element2", "23 x 439", Arrays.asList(elementFunctionality, elementFunctionality1));
        this.extraRobotElementRepository.save(extraRobotElement2);
        this.extraRobotElementRepository.save(extraRobotElement3);

        elementFunctionality1.setName("zmieniona nazwa2");
        this.elementFunctionalityService.updateOne(elementFunctionality1);

        extraRobotElement.setName("zmieniony");
        //robotmModel.setName("modelek");
        robotBattery.setProductionDate("data zmieniona");
        robotStatus1.setName("test test");

        this.extraRobotElementService.updateOne(extraRobotElement);
        //this.robotModelService.updateOne(robotmModel);
        this.robotBatteryService.updateOne(robotBattery);
        this.robotStatusService.updateOne(robotStatus1);

        batteryType.setName("zmieniona test");
        this.batteryTypeService.updateOne(batteryType);

        propulsionType.setName("lorem ipsum");
        this.propulsionTypeService.updateOne(propulsionType);

        robot.setRobotIp("255.255.255.255");
        reviewType.setName("test zmian");
        this.robotService.updateOne(robot);
        this.reviewTypeService.updateOne(reviewType);

        behaviour.setName("tescik");
        taskPriority.setName("zmiany zmiany");
        this.behaviourService.updateOne(behaviour);
        this.taskPriorityService.updateOne(taskPriority);*/

        //this.graphService.deleteOne(graph); //testing graph cascade
    }

}

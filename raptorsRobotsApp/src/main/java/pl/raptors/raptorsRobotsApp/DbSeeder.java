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

    }

}

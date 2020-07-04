from src.barrier_generator.smart_brute_force.smart_brute_force import SmartBruteForce
from src.barrier_generator.vectorized_analysis_algorithm.robot_config import RobotConfig
from src.map_processing.map_processing import MapProcessing


class BarrierGenerationFacade():

    def generate_barriers(self, map_image, robot_diameter, robot_starting_position, plot=False):
        print("Start generate, param: robot_diameter=", robot_diameter, "robot_starting_position=" , robot_starting_position)
        robot_config = RobotConfig(robot_diameter,robot_starting_position)
        algorithm = SmartBruteForce(robot_config)
        map_processing = MapProcessing()

        map_image = map_processing.extract_contours(map_image)
        #Returning only impassable regions
        print("GENERATOR DONE!")
        return algorithm.generate_polygon_regions(map_image,plot=plot)[1]


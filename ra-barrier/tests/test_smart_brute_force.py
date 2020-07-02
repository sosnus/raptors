from PIL import Image

from src.barrier_generator.vectorized_analysis_algorithm.robot_config import RobotConfig
from src.barrier_generator.smart_brute_force.smart_brute_force import SmartBruteForce, Region
from tests.test_base import TestBase
import numpy as np
import matplotlib.pyplot as plt

class SmartBruteForceTests(TestBase):
    def test_generate_regions(self):
        # given
        img = np.array(Image.open("../test_resources/poly2.bmp").convert('L'))
        line_threshold = 40
        starting_position = (400, 300)
        robot_config = RobotConfig(line_threshold, starting_position)
        barrier_generator = SmartBruteForce(robot_config)

        # when
        passable_region, impassable_regions = barrier_generator.generate_regions(img, plot=True)


        #then
        self.assertTrue(isinstance(passable_region,Region))
        self.assertTrue(len(impassable_regions)>=1)

from PIL import Image

from src.api.barrier_generation_controller import BarrierGenerationFacade
from src.barrier_generator.vectorized_analysis_algorithm.barrier_generator import BarrierGenerator
from src.barrier_generator.vectorized_analysis_algorithm.boundary_extractor import BoundaryExtractor
from src.barrier_generator.vectorized_analysis_algorithm.robot_config import RobotConfig
from src.map_processing.map_loading import FilePathMapLoader
from src.map_processing.map_processing import MapProcessing
from tests.test_base import TestBase

import numpy as np
import matplotlib.pyplot as plt

class BarrierGenerationTests(TestBase):
    def test_generate_additional_lines(self):
        # given
        img = np.array(Image.open("../test_resources/poly2.bmp").convert('L'))
        line_threshold = 50
        boundary_extractor = BoundaryExtractor()
        robot_config = RobotConfig(line_threshold, None)
        barrier_generator = BarrierGenerator(robot_config)

        # when
        image = barrier_generator.generate_barrier_boundaries(boundary_extractor.extract_boundary_geometries(img),img)

        # then
        plt.imshow(image)
        plt.show()
        # self.assertEqual(img.shape[:2], np.array(image).shape[:2])

    def test_api(self):
        #given
        api = BarrierGenerationFacade()

        filepath = self.resource_loader.get_test_map_filepath('apartment.pgm')
        map_processing = FilePathMapLoader(filepath)
        map_image = map_processing.load_image()

        robot_diameter = 10
        # robot_starting_position = (150, 350)
        robot_starting_position = (75, 250)

        #when
        regions = api.generate_barriers(map_image,robot_diameter,robot_starting_position, plot=True)

        #then
        self.assertTrue(1, len(regions))
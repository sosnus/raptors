import unittest

import matplotlib.pyplot as plt
import numpy as np

from src.barrier_generator.vectorized_analysis_algorithm.map_coloring import MapColoring
from src.map_processing.map_loading import FilePathMapLoader
from tests.test_base import TestBase


# http://melvincabatuan.github.io/SLIC-Superpixels/
class MapColoringTests(TestBase):
    @unittest.skip
    def test_color_map(self):
        #Given
        countours_image_filepath = self.resource_loader.get_resource_by_filepath('contours_to_be_colored.png')
        map_loader = FilePathMapLoader(countours_image_filepath)
        countours_image = map_loader.load_image_rgb()
        map_coloring = MapColoring(segs=1000, min_size=200)

        #When
        segmentation_map = map_coloring.extract_colored_map(countours_image)

        #Then
        plt.imshow(segmentation_map)
        plt.show()
        print(np.min(segmentation_map))
        print(np.max(segmentation_map))

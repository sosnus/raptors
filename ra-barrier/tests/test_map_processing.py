import numpy as np

from src.map_processing.map_loading import FilePathMapLoader
from src.map_processing.map_processing import MapProcessing
from tests.test_base import TestBase


class MapProcessingTests(TestBase):
    def test_extract_contours(self):
        # given
        filepath = self.resource_loader.get_test_map_filepath('apartment.pgm')
        map_image = FilePathMapLoader(filepath).load_image()
        map_processing = MapProcessing()

        # when
        map_image = map_processing.extract_contours(map_image)

        # then
        map_processing.show_image(map_image)
        self.is_PIL_Image(map_image)
        self.image_only_have_white_or_black_pixels(map_image)

    def image_only_have_white_or_black_pixels(self, image):
        non_white_or_black_pixels = [pixel for pixel in list(np.array(image).flatten()) if pixel != 255 and pixel != 0]
        self.assertEqual(0, len(non_white_or_black_pixels))
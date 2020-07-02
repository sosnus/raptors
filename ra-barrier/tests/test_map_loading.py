import unittest

from src.map_processing.database_config import DatabaseConfig
from src.map_processing.map_loading import MapLoader, FilePathMapLoader
from tests.test_base import TestBase


class MapLoadingTests(TestBase):
    @unittest.skip
    def test_database_integration(self):
        #given
        database_config = DatabaseConfig()
        map_loader = MapLoader(database_config)

        #when
        map = map_loader.load_image()

        #then
        self.is_PIL_Image(map)
        self.is_image_grayscale(map)

    def test_filepath_map_loader(self):
        # given
        filepath = self.resource_loader.get_test_map_filepath('apartment.pgm')
        map_processing = FilePathMapLoader(filepath)

        # when
        map = map_processing.load_image()

        # then
        self.is_PIL_Image(map)
        self.is_image_grayscale(map)
import os
from unittest import TestCase

from src.barrier_generator.smart_brute_force.smart_brute_force import Region, SmartBruteForce
from src.map_processing.map_loading import FilePathMapLoader
import numpy as np

from tests.test_base import TestBase


class RegionTests(TestBase):
    def test_extract_boundary_from_full_area(self):
        # Given
        region = self.load_region_from_test_area_file('area1.bmp')

        # When
        polygonized_regions = region.polygonize()

        # Then
        self.assertTrue(len(polygonized_regions), 1)

    def test_split_areas_with_single_innering(self):
        # Given
        region = self.load_region_from_test_area_file('area2.bmp')

        # When
        polygonized_regions = region.polygonize()

        # Then
        self.assertTrue(len(polygonized_regions), 2)
        self.assertFalse(polygonized_regions[0].contains(polygonized_regions[1]) or polygonized_regions[1].contains(polygonized_regions[0]))

    def load_region_from_test_area_file(self, filename):
        area_filepath = self.resource_loader.get_resource_by_filepath('areas' + os.sep + filename)
        #Makes PASSABLE from white
        region_map = np.array(np.array(FilePathMapLoader(area_filepath).load_image()) == 0, dtype=int)* SmartBruteForce.PASSABLE
        region = Region(region_map)
        return region

    def test_split_areas_with_multiple_innering(self):
        # Given
        region = self.load_region_from_test_area_file('area4.bmp')

        # When
        polygonized_regions = region.polygonize()

        # Then
        self.assertTrue(len(polygonized_regions), 3)

    def test_throws_exception_from_full_area_touching_boundary(self):
        # Given
        region = self.load_region_from_test_area_file('area3.bmp')

        # When
        was_exception_thrown = False
        try:
            polygonized_regions = region.polygonize()
        except Exception:
            was_exception_thrown = True

        # Then
        self.assertTrue(was_exception_thrown)

    def test_throws_exception_on_area_touching_bonudary(self):
        # Given
        region = self.load_region_from_test_area_file('area5.bmp')

        # When
        was_exception_thrown = False
        try:
            polygonized_regions = region.polygonize()
        except Exception:
            was_exception_thrown = True

        # Then
        self.assertTrue(was_exception_thrown)

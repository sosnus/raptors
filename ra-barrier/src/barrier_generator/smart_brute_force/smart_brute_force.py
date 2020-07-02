from cmath import inf
from collections import deque

import matplotlib.pyplot as plt
import numpy as np
from scipy import signal
from shapely.geometry import Polygon, LineString, MultiPolygon
from shapely.ops import split
from skimage import measure


def flatten_list(list_of_lists):
    return [y for x in list_of_lists for y in x]

def show_polygon(polygon, plot=False):
    plt.plot(*polygon.exterior.xy)
    if plot:
        plt.show()

class SmartBruteForce:
    NOT_CHECKED = 255
    PASSABLE = 128
    BLOCKED = 64
    BOUNDARY = 0

    def __init__(self, robot_config) -> None:
        super().__init__()
        self.robot_config = robot_config

    def generate_polygon_regions(self, image, plot=False):
        before_thicken_image = np.copy(image)
        after_thicken_image = self.thicken_boundaries(image)

        if plot:
            plt.imshow(before_thicken_image, cmap='gray')
            plt.title("Before thicken boundaries")
            plt.show()

            plt.imshow(after_thicken_image, cmap='gray')
            plt.title("After thicken")
            plt.show()

        boundary_region = self.create_boundary_region(after_thicken_image, before_thicken_image)
        passable_region, impassable_regions = self.generate_regions(after_thicken_image, plot=plot)

        if plot:
            boundary_region.show_area()

        impassable_regions_polygonized = [region.polygonize() for region in impassable_regions]
        impassable_regions_polygonized.append(boundary_region.polygonize_empty_inside())


        return passable_region.polygonize(), flatten_list(impassable_regions_polygonized)

    def create_boundary_region(self, after_thicken_image, before_thicken_image):
        return Region(  np.array((255-after_thicken_image)/255 * SmartBruteForce.PASSABLE, dtype=int))

    def thicken_boundaries(self, image):
        img = np.array(image)
        line_threshold = self.robot_config.get_diameter()
        WHITE_PIXEL = 255
        out_img = WHITE_PIXEL - img
        array = self.create_circle_array(line_threshold // 2, line_threshold // 2, line_threshold + 1,
                                         line_threshold // 2)
        out_img = signal.convolve2d(out_img, array, mode='same')
        out_img = (1 - np.array(out_img > 0, dtype=int)) * WHITE_PIXEL
        return out_img

    def generate_regions(self, map_image, plot=False):
        blocked_regions = []
        map = np.copy(map_image)

        passable_region_map = self.generate_region(map, self.robot_config.get_starting_position())
        map = self.merge_region_to_map(map, passable_region_map)
        passable_region = Region(passable_region_map)

        try:
            while True:
                next_region_starting_position = self.find_next_region_position(map)
                region_map = self.generate_region(map, next_region_starting_position)
                map = self.merge_region_to_map(map, region_map)
                region = Region(region_map)

                if not region.is_passable_area_at_boundary():
                    blocked_regions.append(region)

        except ValueError:

            if plot:
                plt.title("Passable region")
                passable_region.show_boundary()
                plt.title("Passable region")
                passable_region.show_area()

                plt.title("Passable region after pologinization")
                passable_region.show_polygonized()

                for i, region in enumerate(blocked_regions):
                    plt.title("Impassable region " + str(i))
                    region.show_boundary()

                    plt.title("Impassable region area" + str(i))
                    region.show_area()

                    plt.title("After pologinization")
                    region.show_polygonized()

            return passable_region, blocked_regions

    def merge_region_to_map(self, map, region):
        return map * np.array(region != SmartBruteForce.PASSABLE, dtype=int)

    def find_next_region_position(self, map_image):
        next_region_starting_position = np.argwhere(map_image == SmartBruteForce.NOT_CHECKED)
        try:
            return next_region_starting_position[0]
        except Exception:
            raise ValueError("No more UNCHECKED regions found!!")

    def generate_region(self, map_image, region_starting_position):
        positions_to_be_checked = deque([region_starting_position])
        position_map = np.ones_like(np.array(map_image)) * SmartBruteForce.NOT_CHECKED

        MAP_HEIGHT, MAP_WIDTH = map_image.shape

        while len(positions_to_be_checked) > 0:
            current_x, current_y = positions_to_be_checked.popleft()

            if map_image[current_x, current_y] != SmartBruteForce.BOUNDARY:
                position_map[current_x, current_y] = SmartBruteForce.PASSABLE

                if current_x - 1 >= 0:
                    pos = (current_x - 1, current_y)
                    self.add_position(position_map, pos, positions_to_be_checked)
                if current_x + 1 < MAP_HEIGHT:
                    pos = (current_x + 1, current_y)
                    self.add_position(position_map, pos, positions_to_be_checked)
                if current_y - 1 >= 0:
                    pos = (current_x, current_y - 1)
                    self.add_position(position_map, pos, positions_to_be_checked)
                if current_y + 1 < MAP_WIDTH:
                    pos = (current_x, current_y + 1)
                    self.add_position(position_map, pos, positions_to_be_checked)
            else:
                position_map[current_x, current_y] = SmartBruteForce.BLOCKED

        return position_map

    def add_position(self, position_map, pos, positions_to_be_checked):
        if position_map[pos[0], pos[1]] == SmartBruteForce.NOT_CHECKED and pos not in positions_to_be_checked:
            positions_to_be_checked.append(pos)

    def create_circle_array(self, center_x, center_y, square_side, radius, value=1):
        y, x = np.ogrid[-center_x:square_side - center_x, -center_y:square_side - center_y]
        mask = x * x + y * y <= radius * radius
        array = np.zeros((square_side, square_side))
        array[mask] = value
        return array


class Region():
    def __init__(self, region_map) -> None:
        super().__init__()
        self.region_map = region_map
        # self.region_map = self.block_boundary(region_map)

    def get_boundary(self):
        return (1 - np.array(self.region_map == SmartBruteForce.BLOCKED, dtype=int) * 255)

    def get_area(self):
        return (1 - np.array(self.region_map == SmartBruteForce.PASSABLE, dtype=int) * 255)

    def show_area(self):
        plt.imshow(self.get_area(), cmap='gray')
        plt.show()

    def show_boundary(self):
        plt.imshow(self.get_boundary(), cmap='gray')
        plt.show()

    def polygonize_empty_inside(self):
        self.check_passable_area_does_not_touch_boundary()

        polygons = self.extract_polygons_geometries_from_img(self.get_area())
        if self.are_polygon_geometries_with_innerings(polygons):
            outer_polygon = self.find_outer_polygon(polygons)
            inner_polygons = polygons.copy()
            inner_polygons.remove(outer_polygon)
            polygon_with_innerings = PolygonWithInnerings(outer_polygon, inner_polygons)

            polygons = []
            self.split_till_no_innerings_left(polygon_with_innerings, polygons)

        return polygons

    def polygonize(self):
        self.check_passable_area_does_not_touch_boundary()
        return self.extract_polygons_geometries_from_img(self.get_area())


    def split_till_no_innerings_left(self, polygon_with_innerings, final_polygons):
        if len(polygon_with_innerings.innering_polygons) == 0:
            final_polygons.append(polygon_with_innerings.outer_polygon)
        else:
            splitting_line = polygon_with_innerings.get_vertical_split_line_for_first_innering()
            polygons_with_innerings_after_split = polygon_with_innerings.split_by_line(splitting_line)

            for polygon in polygons_with_innerings_after_split:
                self.split_till_no_innerings_left(polygon, final_polygons)

    def are_polygon_geometries_with_innerings(self, polygons):
        return len(polygons) > 1

    def find_outer_polygon(self, polygons):
        for polygon1 in polygons:
            for polygon2 in polygons:
                if polygon1.contains(polygon2):
                    return polygon1
                if polygon2.contains(polygon1):
                    return polygon2
        raise Exception("Outer polygon not found")

    def show_polygonized(self):
        for polygon in self.polygonize():
            show_polygon(polygon)
        # for polygon in self.polygonize():
        #     plt.plot(*polygon.interiors.xy)
        plt.show()

    def extract_polygons_geometries_from_img(self, img, coutours_level=0.0001, poly_simplification_level=1.0):
        # add padding booundary for areas that touch boundaries of image
        # padded_area = np.pad(img, [(1, ), (1, )], mode='constant')
        padded_area = img
        countours = measure.find_contours(padded_area, coutours_level)
        return [Polygon(c).simplify(poly_simplification_level) for c in countours]

    def check_passable_area_does_not_touch_boundary(self):
        if self.is_passable_area_at_boundary():
            raise Exception("Region at boundary is not supported!! It may be because of wrong map or position of robot")

    def is_passable_area_at_boundary(self):
        first_row = self.region_map[0, :]
        last_row = self.region_map[-1, :]
        first_colmun = self.region_map[:, 0]
        last_column = self.region_map[:, -1]

        for vector in [first_row, last_row, first_colmun, last_column]:
            if np.any(vector == SmartBruteForce.PASSABLE):
                return True
        return False



class PolygonWithInnerings():
    def __init__(self, outer_polygon, innering_polygons) -> None:
        super().__init__()
        self.outer_polygon = outer_polygon
        self.innering_polygons = innering_polygons

    def split_by_line(self, line):
        outer_polygon_collection = split(self.outer_polygon, line)
        outer_polygon_parts = [outer_polygon_collection[i] for i in range(len(outer_polygon_collection))]
        index_polygon_innerings = {}

        for i in range(len(outer_polygon_parts)):
            index_polygon_innerings[i] = []

        for inner_polygon in self.innering_polygons:
            if len(split(inner_polygon, line)) >= 2:
                for i,outer_polygon_part in enumerate(outer_polygon_parts):
                    #TODO -> fix multipolygon hack
                    diff = outer_polygon_part.difference(inner_polygon)
                    if isinstance(diff, MultiPolygon):
                        outer_polygon_parts[i] = diff[0]
                    else:
                        outer_polygon_parts[i] = diff
            else:
                for i, outer_polygon_part in enumerate(outer_polygon_parts):
                    if outer_polygon_part.contains(inner_polygon):
                        index_polygon_innerings[i].append(inner_polygon)

        return [PolygonWithInnerings(outer_polygon_parts[i], index_polygon_innerings[i]) for i in
                range(len(outer_polygon_parts))]

    def get_vertical_split_line_for_first_innering(self):
        return self.get_horizontal_line_going_through_center_of_mass(self.outer_polygon)

    def get_horizontal_line_going_through_center_of_mass(self, polygon):
        center_x, center_y = polygon.centroid.coords.xy
        min_y = -inf
        max_y = inf
        for x, y in polygon.exterior.coords:
            if y > min_y:
                min_y = y
            if y < max_y:
                max_y = y

        return LineString([(center_x[0], min_y), (center_x[0], max_y)])

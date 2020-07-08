import math

import numpy as np
from PIL import Image, ImageDraw
from shapely.geometry import LineString, Point

from src.barrier_generator.vectorized_analysis_algorithm.map_coloring import MapColoring
from src.barrier_generator.vectorized_analysis_algorithm.min_distance_utils import get_min_distance_pair_points, line_contains_point, Direction, get_intersection_points, convert_line_to_coefficients


class BarrierGenerator():
    def __init__(self,robot_config) -> None:
        super().__init__()
        self.robot_config = robot_config
        self.map_coloring = MapColoring()

    def generate_barrier_boundaries(self, geometries_list, contours_img):
        empty_image = Image.fromarray(np.uint8(np.ones((contours_img.shape[0], contours_img.shape[1], 3))) * 255)
        external_boundary_geometry, internal_object_geometries = self.extract_internal_and_external_boundaries(geometries_list)
        new_lines = self.create_additional_lines_shorter_than_threshold(external_boundary_geometry, internal_object_geometries, self.robot_config.get_diameter())

        image_with_boundary_lines = self.draw_boundaries(empty_image, external_boundary_geometry, internal_object_geometries, new_lines)
        return self.map_coloring.extract_colored_map(image_with_boundary_lines, contours_img)

    def extract_internal_and_external_boundaries(self, geometries):
        external_boundary_geometry = geometries[0]
        internal_object_geometries = []
        if len(geometries) > 1:
            internal_object_geometries.extend(geometries[1:])

        return external_boundary_geometry, internal_object_geometries


    def create_additional_lines_shorter_than_threshold(self,external_boundary_geometry, internal_objects_geometries,
                                                       length_threshold):

        # Extracting all lines that are that repserent inner line of external boundary and outer lines of internal objects
        all_lines = []
        all_lines.extend(self.divide_polygon_into_set_of_lines(external_boundary_geometry.get_internal_boundary()))
        for internal_object_geometry in internal_objects_geometries:
            all_lines.extend(self.divide_polygon_into_set_of_lines(internal_object_geometry.get_external_boundary()))

        new_lines = []
        for line1 in all_lines:
            for line2 in all_lines:
                if line1 == line2:
                    break

                # If lines already interset get_min_distance_pair_points throws AssertionError
                try:
                    x, y, distance = get_min_distance_pair_points(line1, line2)
                except AssertionError:
                    distance = 0

                if distance < length_threshold:
                    #There are 2 cases we can move to left/right from min distance point
                    #TODO -> fix point line generation on edges
                    point_left_1, point_left_2 = self.return_points_on_lines_with_distance_closest_to_target_when_moving_both_points(line1,
                                                                                                            line2,
                                                                                                            length_threshold,
                                                                                                            Direction.LEFT)
                    point_right_1, point_right_2 = self.return_points_on_lines_with_distance_closest_to_target_when_moving_both_points(line1,
                                                                                                            line2,
                                                                                                            length_threshold,
                                                                                                            Direction.RIGHT)
                    new_lines.append(LineString([point_left_1, point_left_2]))
                    new_lines.append(LineString([point_right_1, point_right_2]))

        return new_lines

    def divide_polygon_into_set_of_lines(self,polygon):
        return [LineString([polygon.boundary.coords[i], polygon.boundary.coords[i + 1]]) for i in
                range(len(polygon.boundary.coords) - 1)]

    def return_points_on_lines_with_distance_closest_to_target_when_moving_both_points(self, line1, line2,
                                                                                       target_distance, direction,
                                                                                       delta=1):
        a1,b1 = convert_line_to_coefficients(line1)
        a2,b2 = convert_line_to_coefficients(line1)

        current_point_on_line1, current_point_on_line2, current_distance = self.get_minimum_distance_points_for_lines(line1, line2)

        is_line1_point_on_edge = False
        is_line2_point_on_edge = False

        while not (is_line1_point_on_edge and is_line2_point_on_edge) and current_distance < target_distance:
            # Update points
            new_candidate_point_on_line1 = (current_point_on_line1[0] + math.sqrt(delta)/(1+a1**2) , current_point_on_line1[1] + math.sqrt(delta)/(1+1/(a1**2)))
            new_candidate_point_on_line2 = (current_point_on_line2[0] + math.sqrt(delta)/(1+a2**2) , current_point_on_line2[1] + math.sqrt(delta)/(1+1/(a2**2)))

            if line_contains_point(line1, Point(new_candidate_point_on_line1)):
                current_point_on_line1 = new_candidate_point_on_line1
            else:
                is_line1_point_on_edge = True

            if line_contains_point(line2, Point(new_candidate_point_on_line2)):
                current_point_on_line2 = new_candidate_point_on_line2
            else:
                is_line2_point_on_edge = True

            current_distance = Point(current_point_on_line1).distance(Point(current_point_on_line2))

        return current_point_on_line1, current_point_on_line2

    def get_minimum_distance_points_for_lines(self, line1, line2):
        try:
            current_point_on_line1, current_point_on_line2, current_distance = get_min_distance_pair_points(line1,
                                                                                                       line2)
        except AssertionError:
            current_distance = 0
            current_point_on_line1,  current_point_on_line2 = get_intersection_points(line1,line2)

        return current_point_on_line1, current_point_on_line2, current_distance


    def draw_boundaries(self, empty_image, external_boundary_geometry, internal_object_geometries, new_lines):
        draw = ImageDraw.Draw(empty_image)
        y,x = external_boundary_geometry.get_internal_boundary().exterior.coords.xy
        draw.polygon(list(zip(x,y)), outline='black')

        for internal_object_geometry in internal_object_geometries:
            y, x = internal_object_geometry.get_external_boundary().exterior.coords.xy
            draw.polygon(list(zip(x, y)), outline='black')

        for line in new_lines:
            y,x = line.coords.xy
            draw.line(list(zip(x,y)), fill='black')

        return empty_image
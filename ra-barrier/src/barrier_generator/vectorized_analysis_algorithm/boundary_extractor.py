from shapely.geometry import Polygon
from skimage import color, measure

from src.barrier_generator.geomety_data import Geometry


class BoundaryExtractor:
    def extract_boundary_geometries(self, image):
        return self.extract_polygon_geometries_from_img(image)

    def extract_polygon_geometries_from_img(self,img, coutours_level=0.01, poly_simplification_level=20.0):
        contours = measure.find_contours(img, coutours_level)

        geometries = []
        for geometry_index in range(int(len(contours) / 2)):
            outer_boundary = Polygon(contours[2 * geometry_index]).simplify(poly_simplification_level)
            inner_boundary = Polygon(contours[2 * geometry_index + 1]).simplify(poly_simplification_level)
            geometries.append(Geometry(inner_boundary, outer_boundary))

        return geometries
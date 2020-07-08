from enum import Enum

from shapely.geometry import LineString, Point
import math

def get_min_distance_pair_points(l1, l2):
    """Returns the minimum distance between two shapely LineStrings.

    It also returns two points of the lines that have the minimum distance.
    It assumes the lines do not intersect.

    l2 interior point case:
    >>> l1=LineString([(0,0), (1,1), (1,0)])
    >>> l2=LineString([(0,1), (1,1.5)])
    >>> get_min_distance_pair_points(l1, l2)
    ((1.0, 1.0), (0.8, 1.4), 0.4472135954999578)

    change l2 slope to see the point changes accordingly:
    >>> l2=LineString([(0,1), (1,2)])
    >>> get_min_distance_pair_points(l1, l2)
    ((1.0, 1.0), (0.5, 1.5), 0.7071067811865476)

    l1 interior point case:
    >>> l2=LineString([(0.3,.1), (0.6,.1)])
    >>> get_min_distance_pair_points(l1, l2)
    ((0.2, 0.2), (0.3, 0.1), 0.1414213562373095)

    Both edges case:
    >>> l2=LineString([(5,0), (6,3)])
    >>> get_min_distance_pair_points(l1, l2)
    ((1.0, 0.0), (5.0, 0.0), 4.0)

    Parallels case:
    >>> l2=LineString([(0,5), (5,0)])
    >>> get_min_distance_pair_points(l1, l2)
    ((1.0, 1.0), (2.5, 2.5), 2.1213203435596424)

    Catch intersection with the assertion:
    >>> l2=LineString([(0,1), (1,0.8)])
    >>> get_min_distance_pair_points(l1, l2)
    Traceback (most recent call last):
      ...
      assert( not l1.intersects(l2))
    AssertionError

    """

    def distance(a, b):
        return math.sqrt( (a[0]-b[0])**2 + (a[1]-b[1])**2 )

    def get_proj_distance(apoint, segment):
        '''
        Checks if the ortogonal projection of the point is inside the segment.

        If True, it returns the projected point and the distance, otherwise
        returns None.
        '''
        a = ( float(apoint[0]), float(apoint[1]) )
        b, c = segment
        b = ( float(b[0]), float(b[1]) )
        c = ( float(c[0]), float(c[1]) )
        # t = <a-b, c-b>/|c-b|**2
        # because p(a) = t*(c-b)+b is the ortogonal projection of vector a
        # over the rectline that includes the points b and c.
        t = (a[0]-b[0])*(c[0]-b[0]) + (a[1]-b[1])*(c[1]-b[1])
        t = t / ( (c[0]-b[0])**2 + (c[1]-b[1])**2 )
        # Only if t 0 <= t <= 1 the projection is in the interior of
        # segment b-c, and it is the point that minimize the distance
        # (by pitagoras theorem).
        if 0 < t < 1:
            pcoords = (t*(c[0]-b[0])+b[0], t*(c[1]-b[1])+b[1])
            dmin = distance(a, pcoords)
            return a, pcoords, dmin
        elif t <= 0:
            return a, b, distance(a, b)
        elif 1 <= t:
            return a, c, distance(a, c)

    def get_min(items1, items2, distance_func, revert=False):
        "Minimum of all distances (with points) achieved using distance_func."
        a_min, b_min, d_min = None, None, None
        for p in items1:
            for s in items2:
                a, b, d = distance_func(p, s)
                if d_min == None or d < d_min:
                    a_min, b_min, d_min = a, b, d
        if revert:
            return b_min, a_min, d_min
        return a_min, b_min, d_min

    assert( not l1.intersects(l2))

    l1p = list(l1.coords)
    l2p = list(l2.coords)
    l1s = zip(l1p, l1p[1:])
    l2s = zip(l2p, l2p[1:])

    edge1_min = get_min(l1p, l2s, get_proj_distance)
    edge2_min = get_min(l2p, l1s, get_proj_distance, revert=True)

    if edge1_min[2] <= edge2_min[2]:
        return edge1_min
    else:
        return edge2_min


class Direction(Enum):
    LEFT=-1
    RIGHT=1

def return_points_on_lines_with_distance_closest_to_target_when_moving_both_points(line1, line2,
                                                                                   target_distance, direction,
                                                                                   delta_y=1):
    line1_formula = convert_line_to_formula(line1)
    line2_formula = convert_line_to_formula(line2)

    # line1_edge_point = get_line_edge_point(line1, direction)
    # line2_edge_point = get_line_edge_point(line2, direction)

    try:
        current_point_on_line1, current_point_on_line2, current_distance = get_min_distance_pair_points(line1, line2)
    except AssertionError:
        current_distance = 0
        intersection_point = line1.intersection(line2)
        current_point_on_line1 = intersection_point.bounds[0:2]
        current_point_on_line2 = intersection_point.bounds[2:]

    is_line1_point_on_edge = False
    is_line2_point_on_edge = False

    while not (is_line1_point_on_edge and is_line2_point_on_edge) and current_distance < target_distance:
        # Update points
        new_line_point_x1 = current_point_on_line1[0] + direction.value * calculate_delta_x(line1_formula,delta_y)
        new_line_point_x2 = current_point_on_line2[0] + direction.value * calculate_delta_x(line2_formula,delta_y)

        # if not is_line1_point_on_edge:
        new_candidate_point_on_line1     = (new_line_point_x1 , line1_formula(new_line_point_x1))
        # if not is_line2_point_on_edge:
        new_candidate_point_on_line2 = (new_line_point_x2, line2_formula(new_line_point_x2))

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

def are_points_equal(point1, point2):
    return point1.distance(point2) < 1e-8

def get_line_edge_point(line, direction):
    x1, y1, x2, y2 = line.bounds
    if direction == Direction.LEFT:
        return (x1, y1)
    elif direction == Direction.RIGHT:
        return (x2, y2)
    else:
        raise ValueError("Bad direction")

def line_contains_point(line, point):
    return line.distance(point) < 1e-8


def convert_line_to_coefficients(line):
    x1, y1, x2, y2 = line.bounds

    #Hack for vertical lines
    if x1 == x2:
        x1 = x1-0.00000001
    if y1 == y2:
        y1 = y1-0.0000001


    a = (y2 - y1) / (x2 - x1)
    b = y1 - a * x1
    return a,b

def convert_line_to_formula(line):
    a,b = convert_line_to_coefficients(line)
    return lambda x: a * x + b

def calculate_delta_x(line_formula, delta_y):
    return delta_y / (line_formula(1)-line_formula(0))

def get_intersection_points(line1, line2):
    intersection_point = line1.intersection(line2)
    current_point_on_line1 = intersection_point.bounds[0:2]
    current_point_on_line2 = intersection_point.bounds[2:]

    return current_point_on_line1, current_point_on_line2
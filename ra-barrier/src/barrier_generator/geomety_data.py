class Geometry():
    def __init__(self, internal_boundary, external_boundary) -> None:
        super().__init__()
        self.internal_boundary = internal_boundary
        self.external_boundary = external_boundary

    def get_internal_boundary(self):
        return self.internal_boundary

    def get_external_boundary(self):
        return self.external_boundary


class Boundary():
    def __init__(self, boundary_points) -> None:
        super().__init__()
        self.boundary_points = boundary_points

    def get_boundary_points(self):
        return self.boundary_points

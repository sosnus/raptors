class RobotConfig():

    def __init__(self, diameter, starting_position) -> None:
        super().__init__()
        self.diameter = diameter
        self.starting_position = starting_position

    def get_diameter(self):
        return self.diameter

    def get_starting_position(self):
        return self.starting_position
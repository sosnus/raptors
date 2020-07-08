from PIL import Image
import numpy as np

class MapLoader():
    def __init__(self,database_config) -> None:
        super().__init__()
        self.database_config = database_config

    def load_image(self):
        pass


class FilePathMapLoader():
    def __init__(self, filepath) -> None:
        super().__init__()
        self.filepath = filepath

    def load_image(self):
        return Image.open(self.filepath).convert('L')

    def load_image_rgb(self):
        return Image.open(self.filepath)
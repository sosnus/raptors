from unittest import TestCase

from PIL.Image import Image

from tests.resource_loader import ResourceLoader
import numpy as np
import matplotlib.pyplot as plt

class TestBase(TestCase):

    def __init__(self, methodName: str = ...) -> None:
        super().__init__(methodName)
        self.resource_loader = ResourceLoader()

    def is_PIL_Image(self,image):
        self.assertTrue(isinstance(image, Image))

    def is_image_grayscale(self, image):
        self.assertEqual(2, len(np.array(image).shape))

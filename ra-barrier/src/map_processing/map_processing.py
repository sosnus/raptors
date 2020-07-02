
import matplotlib.pyplot as plt
import numpy as np
import os
from PIL import Image, ImageFilter


class MapProcessing():

    def __init__(self, black_pixel_threshold = 250) -> None:
        super().__init__()
        # self.black_pixel_threshold = int(os.environ.get('black-pixel-threshold'))
        print("TODO: poprawć, dodc wyątki")
        self.black_pixel_threshold = 250

    def extract_contours(self, map_image):
        arr = np.array(map_image)
        image = Image.fromarray(arr)
        image = image.filter(ImageFilter.CONTOUR)
        image = image.filter(ImageFilter.EDGE_ENHANCE_MORE)
        #TODO -> verify box blur value
        image = image.filter(ImageFilter.BoxBlur(0.3))
        arr = np.array(image)

        #Remove any blur to black values
        black_pixel_threshold = 250
        arr[arr < black_pixel_threshold] = 0
        arr[arr >= black_pixel_threshold] = 255

        #Countour side effect
        arr2 = np.ones_like(arr)*255
        arr2[2:-2,2:-2] = arr[2:-2,2:-2]
        image = Image.fromarray(arr2)

        return image

    def show_image(self,image, cmap='gray'):
        plt.imshow(image, cmap=cmap)
        plt.show()
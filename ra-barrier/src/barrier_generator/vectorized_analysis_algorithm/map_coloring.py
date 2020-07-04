import numpy as np
from skimage.segmentation import felzenszwalb


class MapColoring:
    def __init__(self,segs=1000, min_size=100, threshold=200) -> None:
        super().__init__()
        self.segs = segs
        self.min_size = min_size
        self.threshold = threshold

    def extract_regions(self, segments):
        regions = []
        for index in self.get_occurence_map(segments):
            regions.append(NeighbouringRegion.extract_from_map(segments,index))

        #Add neighbours
        for region1 in regions:
            regions_iter = iter(regions)
            region2 = next(regions_iter)
            while region1 != region2:

                region2 = next(regions_iter)



    def extract_colored_map(self, image_with_boundaries, contours_image):
        segments = felzenszwalb(image_with_boundaries, scale=self.segs, min_size=self.min_size)

        for i in range(contours_image.shape[0]):
            for j in range(contours_image.shape[1]):
                if contours_image[i,j] == 0:
                    segments[i, j] = 255

        occurence_map = self.get_occurence_map(segments)

        keys = list(occurence_map.keys())
        for key in keys:
            if occurence_map[key] > self.threshold:
                del occurence_map[key]


        for i in range(segments.shape[0]):
            for j in range(segments.shape[1]):
                if segments[i,j] in occurence_map.keys():
                    segments[i, j] = 255



        return segments

    def get_occurence_map(self, segments):
        occurence_map = {}  # declares an empty set
        for lst in segments:  # loops over the items in myList          (for j in myList)
            for item in lst:  # loops over the nested lists in myList   (for i in j)
                if item not in occurence_map.keys():
                    occurence_map[item] = 0
                occurence_map[item] +=1

        return occurence_map



class NeighbouringRegion:
    def __init__(self, region_on_map) -> None:
        super().__init__()
        self.region_on_map = region_on_map
        self.neighbours = []

    def get_region_on_map(self):
        return self.region_on_map

    def add_neighbour(self, neighbour):
        self.neighbours.append(neighbour)

    @staticmethod
    def extract_from_map(map,index):
        return NeighbouringRegion(np.array(map==index, dtype=int))


    def is_neigbour_to(self, neighbour):
        pass


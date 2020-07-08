import matplotlib.pyplot as plt


def show_polygons(polygon_list):
    for polygon in polygon_list:
        x, y = polygon.exterior.xy
        plt.plot(x, y)

    plt.show()

from src.api.barrier_generation_controller import BarrierGenerationFacade
from src.map_processing.map_loading import FilePathMapLoader
from src.visualization.polygons_visualization import show_polygons
from tests.resource_loader import ResourceLoader
import matplotlib.pyplot as plt
configs = [
    ('apartment.pgm',10, (75,250)),
    # ('factory_map.pgm',10,(500,500) ),
    ('demoGeniale.pgm', 10, (350,350) ),
    ('hefei_arenaA.pgm', 10, (330,330) ),
    ('hefei_version1.pgm',10, (350,320) )]
    # ('map042013.pgm', ),
    # ('masterpiece.pgm', ),
    # ('wm2013.pgm', )]

resource_loader = ResourceLoader()
barrier_generator = BarrierGenerationFacade()


for config in configs:
    map_name, robot_diameter, robot_starting_position = config
    map_filepath = resource_loader.get_test_map_filepath(map_name)
    map_image = FilePathMapLoader(map_filepath).load_image()

    impassable_polygons = barrier_generator.generate_barriers(map_image, robot_diameter, robot_starting_position, plot=False)

    plt.title("Impassable regions for " + map_name)
    show_polygons(impassable_polygons)
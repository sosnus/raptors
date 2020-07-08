from flask import Flask
import urllib.request
import timeit
import os
from PIL import Image
from src.api.barrier_generation_controller import BarrierGenerationFacade
from tests.resource_loader import ResourceLoader
from flask import jsonify, request
from src.map_processing.map_loading import MapLoader
from dotenv import load_dotenv
from urllib.parse import urljoin
import numpy as np
from io import BytesIO
import yaml

load_dotenv()

app = Flask(__name__)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response

@app.route('/')
def index5():
    print("blank request!!!!!!")
    healthz_data = {'status': True, 'version': '1.10.6', 'info': 'blank request'}
    return jsonify(healthz_data)

@app.route('/generate')
def index():
    start = timeit.default_timer()
    # Get parameters
    map_folder_name = request.args.get('map_folder_name')
    map_file_name = request.args.get('map_file_name')
    robot_diameter = int(request.args.get('robot_diameter'))

    # Combine database-url, folder name and map name to get full file url
    file_url = urljoin(os.environ.get('database-url'), ''.join([map_folder_name,'/', map_file_name]))
    print(file_url)

    # Using file url fetch pgm and yaml files files 
    map_pgm = get_pgm_from_path(''.join([file_url, '.png']))
    map_yaml = get_yaml_from_path(''.join([file_url, '.yaml']))

    # Calculate robot starting position using map size, resolution and starting position
    resolution = map_yaml['resolution']
    robot_starting_position = (int(-map_yaml['origin'][0] + offset_x), int(map_yaml['origin'][1] + offset_y))
    
    # Generate barrier polygons for selected map
    bgf = BarrierGenerationFacade()
    barriers = bgf.generate_barriers(map_pgm, robot_diameter, robot_starting_position)

    stop = timeit.default_timer()
    # Parse polygons to string and return
    dummpy_map_test_result = {'map': map_file_name, 'polygons': polygons_to_string(barriers, offset_x, offset_y, resolution), 'time': stop-start}
    return jsonify(dummpy_map_test_result)

@app.route('/dummy_map')
def index2():
    robot_diameter = int(request.args.get('robot_diameter'))

    start = timeit.default_timer()

    map_pgm = Image.open('test_resources/maps/mock_map.pgm', 'r')
    map_yaml = yaml.load(open('test_resources/maps/mock_map.yaml', 'r'), Loader=yaml.FullLoader)

    offset_x = map_pgm.size[0]//2
    offset_y = map_pgm.size[1]//2
    resolution = map_yaml['resolution']
    robot_starting_position = (int(map_yaml['origin'][1] + offset_y), int(map_yaml['origin'][0] + offset_x))
    
    bgf = BarrierGenerationFacade()
    barriers = bgf.generate_barriers(map_pgm, robot_diameter, robot_starting_position)

    stop = timeit.default_timer()

    dummpy_map_test_result = {'map': 'mock_map.pgm', 'polygons': polygons_to_string(barriers, offset_x, offset_y, resolution), 'time': stop-start}
    print("return jsonify(dummpy_map_test_result)")
    print("time:", stop-start)
    return jsonify(dummpy_map_test_result)



@app.route('/performance_test')
def performance_test():
    robot_diameter = 3

    start = timeit.default_timer()

    map_pgm = Image.open('test_resources/maps/apartment.pgm', 'r')
    map_yaml = yaml.load(open('test_resources/maps/apartment.yaml', 'r'), Loader=yaml.FullLoader)

    offset_x = map_pgm.size[0]//2
    offset_y = map_pgm.size[1]//2
    resolution = map_yaml['resolution']
    robot_starting_position = (int(map_yaml['origin'][1] + offset_y), int(map_yaml['origin'][0] + offset_x))
    
    bgf = BarrierGenerationFacade()
    barriers = bgf.generate_barriers(map_pgm, robot_diameter, robot_starting_position)

    stop = timeit.default_timer()

    dummpy_map_test_result = {'map': 'mock_map.pgm', 'polygons': polygons_to_string(barriers, offset_x, offset_y, resolution), 'time': stop-start}
    return jsonify(dummpy_map_test_result)



@app.route('/map_request_test')
def map_request_test():
    map_folder_name = request.args.get('map_folder_name')
    map_file_name = request.args.get('map_file_name')

    start = timeit.default_timer()
    file_url = urljoin(os.environ.get('database-url'), ''.join([map_folder_name,'/', map_file_name]))

    map_pgm = get_files(''.join([file_url, '.pgm']))
    map_yaml = get_files(''.join([file_url, '.yaml']))


    stop = timeit.default_timer()
    print("time:", stop-start)
    performance_test_result = {'time': stop-start, 'passed': True}
    return jsonify(performance_test_result)



@app.route('/healthz')
def index4():
    healthz_data = {'status': True, 'version': '1.10.1'}
    return jsonify(healthz_data)


# HELPERS

def get_files(path):
    response = urllib.request.urlopen(path)
    return response.read()

def get_pgm_from_path(path):
    response = urllib.request.urlopen(path)
    pgm_file =  response.read()
    return Image.open(BytesIO(pgm_file))

def get_yaml_from_path(path):
    response = urllib.request.urlopen(path)
    yaml_file = response.read()
    return yaml.load(yaml_file, Loader=yaml.FullLoader)

def polygons_to_string(polygons, offset_x, offset_y, resolution):
    all_polygons = []
    for polygon in polygons:
        polygon_s = []
        for vertex in list(polygon.exterior.coords):
            x = -(vertex[0] - offset_y) * resolution
            y = (vertex[1] - offset_x) * resolution
            polygon_s.append('{},{}'.format(x,y))
        all_polygons.append('{}'.format('|'.join(polygon_s)))
    all_polygons = '{}'.format('p'.join(all_polygons))
    return all_polygons



if __name__ == '__main__':
    app.run(host='0.0.0.0',port=80)

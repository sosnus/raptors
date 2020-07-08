import os

from src.project_management.filepath_management import FilepathManagement

class ResourceLoader:
    def get_test_map_filepath(self,filename):
        return FilepathManagement.get_test_resources_directory_path().joinpath('maps').joinpath(filename)

    def get_resource_by_filepath(self,filepath):
        return FilepathManagement.get_test_resources_directory_path().joinpath(filepath)


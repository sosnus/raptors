from pathlib import Path

class FilepathManagement():
    @staticmethod
    def get_root_directory_path():
        return Path(__file__).parent.parent.parent

    @staticmethod
    def get_test_directory_path():
        return FilepathManagement.get_root_directory_path().joinpath('test')

    @staticmethod
    def get_test_resources_directory_path():
        return FilepathManagement.get_root_directory_path().joinpath('test_resources')


if __name__ == '__main__':
    print(FilepathManagement.get_root_directory_path())
    print(FilepathManagement.get_test_directory_path())
    print(FilepathManagement.get_test_resources_directory_path())
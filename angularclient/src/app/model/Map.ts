export class Map{
  id: string;
  name: string;
  mapImage: any;
  yamlFile: any;

  constructor(name: string, mapImage: any, yamlFile: any) {
    this.name = name;
    this.mapImage = mapImage;
    this.yamlFile = yamlFile;
  }
}

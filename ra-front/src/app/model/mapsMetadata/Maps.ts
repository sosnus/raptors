import {MapMetadata} from "./MapMetadata";
import {MapTransformation} from "./MapTransformation";
import {MapRotation} from "./MapRotation";

export class Maps {
        id: string;
        urlYaml: string;
        urlPng: string;
        urlPgm: string;
        tags: string[];

         mapMetadata: MapMetadata;
         mapTransformation: MapTransformation;
         mapRotation: MapRotation;


  constructor() {
    this.id = "";
    this.urlYaml = "";
    this.urlPng = "";
    this.urlPgm = "";
    this.tags = [];
    this.mapMetadata = new MapMetadata("", "", "", [], "", "", "");
    this.mapTransformation = new MapTransformation("", 0, 0, 0);
    this.mapRotation = new MapRotation("", 0);
  }
}

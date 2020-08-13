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

}

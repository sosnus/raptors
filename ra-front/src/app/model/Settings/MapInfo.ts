export class MapInfo {
  mapId;
  mapResolutionX: number;
  mapResolutionY: number;
  imageResolutionX: number;
  imageResolutionY: number;
  mapOriginX: number;
  mapOriginY: number;


  constructor(mapId, mapResolutionX: number, mapResolutionY: number, imageResolutionX: number, imageResolutionY: number, mapOriginX: number, mapOriginY: number) {
    this.mapId = mapId;
    this.mapResolutionX = mapResolutionX;
    this.mapResolutionY = mapResolutionY;
    this.imageResolutionX = imageResolutionX;
    this.imageResolutionY = imageResolutionY;
    this.mapOriginX = mapOriginX;
    this.mapOriginY = mapOriginY;
  }
}

export class CurrentMap {
  currentMapId;
  mapResolutionX: number;
  mapResolutionY: number;
  imageResolutionX: number;
  imageResolutionY: number;
  mapOriginX: number;
  mapOriginY: number;


  constructor(CurrentMapId, mapResolutionX: number, mapResolutionY: number, imageResolutionX: number, imageResolutionY: number, mapOriginX: number, mapOriginY: number) {
    this.currentMapId = CurrentMapId;
    this.mapResolutionX = mapResolutionX;
    this.mapResolutionY = mapResolutionY;
    this.imageResolutionX = imageResolutionX;
    this.imageResolutionY = imageResolutionY;
    this.mapOriginX = mapOriginX;
    this.mapOriginY = mapOriginY;
  }
}

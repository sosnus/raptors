export class MapMetadata{
    id: string;
    image: string;
    resolution: string;
    origin: string[];
    negate: string;
    occupied_thresh: string;
    free_thresh: string;
    
   constructor(id: string, image: string, resolution: string, origin: string[], negate: string, occupied_thresh: string, free_thresh: string) {
     this.id = id;
     this.image = image;
     this.resolution = resolution;
     this.origin = origin;
     this.negate = negate;
     this.occupied_thresh = occupied_thresh;
     this.free_thresh = free_thresh;
   }
 }
 
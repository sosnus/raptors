import {StandType} from "../type/StandType";
import {StandStatus} from "../type/StandStatus";
import {Pose} from "./Pose";
import {ParkingType} from "../type/ParkingType";

export class Stand{
  id: string;
  name: string;
  pose: Pose = new Pose();
  parkingType: ParkingType = new ParkingType(null);
  standType: StandType = new StandType(null);
  standStatus: StandStatus = new StandStatus(null);
}

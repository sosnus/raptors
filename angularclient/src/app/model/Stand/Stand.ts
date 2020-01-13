import {StandType} from "./StandType";
import {StandStatus} from "./StandStatus";
import {Pose} from "./Pose";
import {ParkingType} from "../type/ParkingType";

export class Stand{
  id: string;
  name: string;
  pose: Pose = new Pose();
  parkingType: ParkingType = new ParkingType(null);
  standType: StandType = new StandType();
  standStatus: StandStatus = new StandStatus();
}

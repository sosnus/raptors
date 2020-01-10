import {ParkingType} from "./ParkingType";
import {StandType} from "./StandType";
import {StandStatus} from "./StandStatus";
import {Pose} from "./Pose";

export class Stand{
  id: string;
  name: string;
  pose: Pose = new Pose();
  parkingType: ParkingType = new ParkingType();
  standType: StandType = new StandType();
  standStatus: StandStatus = new StandStatus();
}

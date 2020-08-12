import { Injectable } from "@angular/core";
import { Orientation } from "../model/Stand/Orientation";
import { RobotTask } from "../model/Robots/RobotTask";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class StoreService {
  public mapURL: string;
  public robotIDlist: any;
  public readonly robotIP: string;

  // TODO: zapisać w postaci zmiennych w obiekcie
  public mapResolution = 0.05;
  public originX = -10.0;
  public originY = -10.0;
  public imageResolution = 1984;
  public mapID = "5e19f1fa9b1eab79e9a58e08";

  // BEZ "/"
  public baseURL = environment.baseURL;

  // public barrierURL = 'http://raptors-barrier-generator.herokuapp.com/'
  // public barrierURL = 'http://localhost:5000/' // dopisać "/"
  public barrierURL = environment.barrierURL; // dopisać "/"

  public robotTaskList: RobotTask[] = [];
  public robotTaskListTemp: RobotTask[] = [];

  public loggedUserID: string;
}

export function quaternionFromAxisAngle(axis, angle): Orientation {
  // Q = [cos(angle / 2), v * sin(angle / 2)]
  const halfAngle = angle * 0.5;

  const xAxis = axis[0];
  const yAxis = axis[1];
  const zAxis = axis[2];

  const sin = Math.sin(halfAngle);
  const cos = Math.cos(halfAngle);

  const sin_norm =
    sin / Math.sqrt(xAxis * xAxis + yAxis * yAxis + zAxis * zAxis);

  return new Orientation(
    cos,
    xAxis * sin_norm,
    yAxis * sin_norm,
    zAxis * sin_norm
  );
}

export function axisAngleFromQuaternion(orientation: Orientation): number {
  // Q = [cos(angle / 2), v * sin(angle / 2)]
  var sign = 1
  if (orientation.w < 0) sign = 1;
  var angle = Math.asin(orientation.z) * 2 * sign;
  if (angle < 0) angle += 360.0 
  //TODO()
  return angle;
}

export function getCentroid(points) {
  let centerX = 0;
  let centerY = 0;
  points.map((point) => {
    centerX += point.lat;
    centerY += point.lng;
  });
  return [centerX / points.length, centerY / points.length];
}

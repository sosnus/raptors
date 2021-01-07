import { Injectable } from "@angular/core";
import { Orientation } from "../model/Stand/Orientation";
import { RobotTask } from "../model/Robots/RobotTask";
import { TaskTemplate } from "../model/Tasks/TaskTemplate";
import { environment } from "../../environments/environment";
import { Stand } from '../model/Stand/Stand';

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
  // private url = (window.location.host).replace( /:(\d+)/gi, ':8080');
  // public baseURL = 'http://192.168.2.45:4401';

  // public barrierURL = 'http://raptors-barrier-generator.herokuapp.com/'
  // public barrierURL = 'http://localhost:5000/' // dopisać "/"
  public barrierURL = environment.barrierURL; // dopisać "/"

  public robotTaskList: RobotTask[] = [];
  public robotTaskListTemp: RobotTask[] = [];

  public taskTemplateList: TaskTemplate[] = [];
  public kioskList: Stand[] = [];

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
    xAxis * sin_norm,
    yAxis * sin_norm,
    zAxis * sin_norm,
    cos
  );
}

export function axisAngleFromQuaternion(orientation: Orientation): number {
  // Q = [cos(angle / 2), v * sin(angle / 2)]
  var sign = 1
  if (orientation.w < 0) sign = -1;
  var angle = Math.asin(orientation.z) * 2 * sign;
  while (angle < 0) angle += 2*Math.PI;
  while (angle > 2*Math.PI) angle -= 2*Math.PI;

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

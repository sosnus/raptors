import {SpecialProperty} from './SpecialProperty';
import {Property} from "../Property";
import {SpecialPropertyEnum} from "./SpecialPropertyEnum";
import {Orientation} from "../../Stand/Orientation";

export class OrientationProperty extends SpecialProperty {

  constructor(prop: Property) {
    super(prop);
    this.specialType = SpecialPropertyEnum.ORIENTATION;
  }

  toString(): string {
    if(this.isComplex()){
      const values = this.getValue() as Array<Property>;
      const x = values.find(value => value.name === 'x').getValue();
      const y = values.find(value => value.name === 'y').getValue();
      const z = values.find(value => value.name === 'z').getValue();
      const w = values.find(value => value.name === 'w').getValue();

      return this.orientationToString(new Orientation(Number(x), Number(y), Number(z), Number(w)))

    } else {
      return super.toString();
    }
  }

  orientationToString(orientation: Orientation) {
    const o = this.quaternionToEuler(orientation);

    return "yaw " + o[0].toFixed(2) + "° : pitch " + o[1].toFixed(2) + "° : roll " + o[2].toFixed(2) + "°";
  }

  private quaternionToEuler(quaternion: Orientation) {
    const t0 = +2.0 * (quaternion.w * quaternion.x + quaternion.y * quaternion.z);
    const t1 = +1.0 - 2.0 * (quaternion.x * quaternion.x + quaternion.y * quaternion.y);
    const roll = this.radianToDegree(Math.atan2(t0, t1));

    let t2 = +2.0 * (quaternion.x * quaternion.y - quaternion.z * quaternion.x);
    t2 = t2 > +1.0 ? +1.0 : t2;
    t2 = t2 < -1.0 ? -1.0 : t2;
    const pitch = this.radianToDegree(Math.asin(t2));

    const t3 = +2.0 * (quaternion.w * quaternion.z + quaternion.x * quaternion.y);
    const t4 = +1.0 - 2.0 * (quaternion.y * quaternion.y + quaternion.z * quaternion.z);
    const yaw = this.radianToDegree(Math.atan2(t3, t4));

    return [yaw, pitch, roll];
  }

  private radianToDegree(radian: number) {
    return radian * 57.2957795131;
  }

  getName(): string {
    return "Orientacja";
  }
}

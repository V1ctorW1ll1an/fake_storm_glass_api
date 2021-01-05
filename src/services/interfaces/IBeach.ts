import { BeachPosition } from "../enums/beachPosition";

export interface IBeach {
  _id?: string;
  name: string;
  position: BeachPosition;
  lat: number;
  lng: number;
  user: string;
}

import { BeachPosition } from "../enums/beachPosition";

export interface IBeach {
  name: string;
  position: BeachPosition;
  lat: number;
  lng: number;
  user: string;
}

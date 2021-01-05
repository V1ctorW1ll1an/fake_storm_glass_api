import { IBeach } from "@src/services/interfaces/IBeach";
import { Document } from "mongoose";

export interface IBeachModel extends Omit<IBeach, "_id">, Document {}

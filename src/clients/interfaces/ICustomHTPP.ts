import { IRequestConfig } from "@src/clients/interfaces/IRequestConfig";
import { IResponse } from "@src/clients/interfaces/IResponse";

export interface ICustomHTTP {
  get<T>(url: string, config: IRequestConfig): Promise<IResponse<T>>;
}

import { ICustomHTTP } from "@src/clients/interfaces/ICustomHTPP";
import { IRequestConfig } from "@src/clients/interfaces/IRequestConfig";
import { IResponse } from "@src/clients/interfaces/IResponse";
import axios, { AxiosError } from "axios";

export class Request implements ICustomHTTP {
  constructor(private request = axios) {}
  public get<T>(
    url: string,
    config: IRequestConfig = {}
  ): Promise<IResponse<T>> {
    return this.request.get<T, IResponse<T>>(url, config);
  }

  public static isRequestError(error: AxiosError): boolean {
    return !!(error.response && error.response.status);
  }
}

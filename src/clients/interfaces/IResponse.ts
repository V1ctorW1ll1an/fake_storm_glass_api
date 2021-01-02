import { AxiosResponse } from "axios";
/* eslint-disable @typescript-eslint/no-explicit-any*/
/*eslint-disable @typescript-eslint/no-empty-interface*/
export interface IResponse<T = any> extends AxiosResponse<T> {}

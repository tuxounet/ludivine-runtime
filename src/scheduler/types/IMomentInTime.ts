import { IPointInTime } from "./IPointInTime";

export interface IMomentInTime {
  begin: IPointInTime;
  expectEnd: boolean;
  finish?: IPointInTime;
}

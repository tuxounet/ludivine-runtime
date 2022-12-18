import { IMomentInTime } from "../types/IMomentInTime";
import { IPointInTime } from "../types/IPointInTime";
import { PointInTime } from "./PointInTime";

export class MomentInTime implements IMomentInTime {
  static from(moment: IMomentInTime) {
    return new MomentInTime(moment.begin, moment.expectEnd, moment.finish);
  }
  static now(): IMomentInTime {
    return new MomentInTime(PointInTime.now(), false);
  }
  constructor(start: IPointInTime, expectEnd: boolean, end?: IPointInTime) {
    this.begin = start;
    this.expectEnd = expectEnd;
    this.finish = end;
  }

  begin: IPointInTime;
  expectEnd: boolean;
  finish?: IPointInTime;

  isCompleted(): boolean {
    if (!this.expectEnd) return true;
    if (!this.finish) return false;
    return Date.now() > PointInTime.toJsDate(this.finish).getTime();
  }

  toString(): string {
    if (!this.expectEnd || !this.finish)
      return `${PointInTime.toString(this.begin)}`;
    else
      return `${PointInTime.toString(this.begin)}|${PointInTime.toString(
        this.begin
      )}`;
  }
}

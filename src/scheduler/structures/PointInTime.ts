import { BasicError } from "../../errors";
import { IPointInTime } from "../types/IPointInTime";

export class PointInTime {
  static build(
    YYYY: string,
    MM: string,
    DD: string,
    hh: string,
    mm: string,
    ss: string,
    ms: string,
    tz: string
  ): IPointInTime {
    const pointInTime: IPointInTime = {
      YYYY,
      MM,
      DD,
      hh,
      mm,
      ss,
      ms,
      tz,
    };
    return pointInTime;
  }

  static now(): IPointInTime {
    return PointInTime.fromJsDate(new Date());
  }

  static fromJsDate(date: Date): IPointInTime {
    const result: IPointInTime = {
      YYYY: this.formatNumber(date.getFullYear()),
      MM: this.formatNumber(date.getMonth() + 1),
      DD: this.formatNumber(date.getDate() + 1),
      hh: this.formatNumber(date.getHours()),
      mm: this.formatNumber(date.getMinutes()),
      ss: this.formatNumber(date.getSeconds()),
      ms: this.formatNumber(date.getMilliseconds()),
      tz: this.formatNumber(date.getTimezoneOffset()),
    };
    return result;
  }

  static fromString(dateStructureString: string): IPointInTime {
    if (
      dateStructureString == null ||
      dateStructureString.length === 0 ||
      dateStructureString.trim().length === 0
    ) {
      throw BasicError.badQuery(
        "PointInTime",
        "fromString",
        dateStructureString
      );
    }
    const tokens: string[] = [];

    for (const segment of dateStructureString.split("/")) {
      if (!segment.includes(":")) {
        tokens.push(segment);
      } else {
        for (const timeSegement of segment.split(":")) {
          if (!timeSegement.includes("@")) {
            tokens.push(timeSegement);
          } else {
            const tzSegement = timeSegement.split("@");
            tokens.push(tzSegement[0]);
            tokens.push(tzSegement[1]);
          }
        }
      }
    }

    if (tokens.length !== 8)
      throw BasicError.badQuery(
        "PointInTime",
        "fromString",
        dateStructureString
      );
    const result: IPointInTime = {
      YYYY: tokens[0].trim(),
      MM: tokens[1].trim(),
      DD: tokens[2].trim(),
      hh: tokens[3].trim(),
      mm: tokens[4].trim(),
      ss: tokens[5].trim(),
      ms: tokens[6].trim(),
      tz: tokens[7].trim(),
    };
    return result;
  }

  static toString(date: IPointInTime): string {
    return `${date.YYYY}/${date.MM}/${date.DD}/${date.hh}:${date.mm}:${date.ss}:${date.ms}@${date.tz}`;
  }
  static toIsoString(date: IPointInTime): string {
    return PointInTime.toJsDate(date).toISOString();
  }
  static toJsDate(date: IPointInTime): Date {
    const jsDate = new Date(
      Number(date.YYYY),
      Number(date.MM),
      Number(date.hh),
      Number(date.mm),
      Number(date.ss),
      Number(date.ms)
    );
    return jsDate;
  }

  private static formatNumber(input: number): string {
    if (input < 0) return String(input);
    if (input > 9) {
      return String(input);
    } else return `0${input}`;
  }
}

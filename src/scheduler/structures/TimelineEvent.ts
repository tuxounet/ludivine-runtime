import crypto from "crypto";
import { IMomentInTime } from "../types/IMomentInTime";
import { ITimelineEvent } from "../types/ITimelineEvent";
import { MomentInTime } from "./MomentInTime";
export class TimelineEvent implements ITimelineEvent {
  readonly kind = "item";
  readonly hash: string;
  constructor(
    readonly when: IMomentInTime,
    readonly what: string,
    readonly who: string,
    readonly where?: string,
    readonly why?: string
  ) {
    const input = `${this.kind}|${MomentInTime.from(this.when).toString()}|${
      this.who
    }|${this.what}|${this.where}|${this.why}`;
    const hash = crypto.createHash("sha256").update(input).digest("base64");
    this.hash = hash;
  }
  [x: string]: unknown;
}

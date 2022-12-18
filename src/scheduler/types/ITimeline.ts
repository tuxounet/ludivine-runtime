import { IMomentInTime } from "./IMomentInTime";
import { ITimelineEvent } from "./ITimelineEvent";

export interface ITimeline {
  period: IMomentInTime;
  events: ITimelineEvent[];
}

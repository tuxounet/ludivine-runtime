import { IKernelBroker } from "../kernel";
import { ITimeline } from "./types/ITimeline";
import { ITimelineEvent } from "./types/ITimelineEvent";

export interface ISchedulerBroker extends IKernelBroker {
  today(): Promise<ITimeline>;
  push(event: ITimelineEvent): Promise<boolean>;
}

import { IMomentInTime } from "./IMomentInTime";

export interface ITimelineEvent extends Record<string, unknown> {
  kind: string;
  hash: string;
  when: IMomentInTime;
  what: string;
  who: string;
  where?: string;
  why?: string;
}

import { IKernelElement } from "../../kernel/IKernelElement";
import { LogLevel } from "../LogLevel";

export function logMethod(level: LogLevel = LogLevel.TRACE) {
  return function (
    target: IKernelElement,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const targetMethod = descriptor.value;

    descriptor.value = function (...args: any[]): any {
      const emit = (level: LogLevel, icon: string, ...parts: any[]): void => {
        const that = this as any;
        const logger = that.log;
        const argsChain = args.map((item) => {
          if (item == null) {
            return "NULL!";
          }
          if (typeof item === "string") {
            return item;
          }

          if (typeof item.fullName === "string") {
            return `{${String(item.fullName)}}`;
          }
          return `{${JSON.stringify(item)}}`;
        });
        const argsProps = ["(", ...argsChain, ")"];
        if (logger?.emit !== undefined)
          logger.emit(level, icon, propertyKey, ...argsProps, ...parts);
      };

      try {
        emit(level, "🔻");

        const result = targetMethod.apply(this, args);
        if (result instanceof Promise) {
          return result
            .then((result) => {
              emit(level, "🔺", result);
              return result;
            })
            .catch((e) => {
              emit(LogLevel.ERROR, "🛑 ", "failed", ":", e);
              e.emited = true;
            });
        } else {
          emit(level, "🔺", result);
          return result;
        }
      } catch (e: any) {
        if (e.emited === true) {
          emit(LogLevel.ERROR, "🛑", "rejected");
        } else {
          emit(LogLevel.ERROR, "🛑", "failed", ":", e);
        }
        e.emited = true;
        throw e;
      }
    };
  };
}

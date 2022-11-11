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
          try {
            if (typeof item === "string") return item;
            if (item instanceof Error)
              return `${item.name}: ${item.message} ${item.stack ?? ""}`;
            if (typeof item === "object" && typeof item.fullName === "string")
              return "{" + String(item?.fullName) + "}";
            if (item == null) return "NULL!";

            return JSON.stringify(item);
          } catch {
            return "{??}";
          }
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

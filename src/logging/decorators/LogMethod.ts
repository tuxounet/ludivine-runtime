import { IKernelElement } from "../../kernel/IKernelElement";
import { LogLevel } from "../LogLevel";

export function logMethod(level: LogLevel = LogLevel.TRACE) {
  return function (
    target: IKernelElement,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const targetMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const emit = (level: LogLevel, icon: string, ...parts: any[]) => {
        const that: any = this;
        const logger = that["log"];
        const argsChain = args.map((item) => {
          if (item == null) {
            return "NULL!";
          }
          if (typeof item === "string") {
            return item;
          }

          if (typeof item["fullName"] === "string") {
            return `{${item["fullName"]}}`;
          }
          return `{${JSON.stringify(item)}}`;
        });
        const argsProps = ["(", ...argsChain, ")"];
        if (logger && logger.emit)
          logger.emit(level, icon, propertyKey, ...argsProps, ...parts);
      };

      try {
        emit(level, "🔻");

        const result = targetMethod.apply(this, args);
        if (result && result instanceof Promise) {
          return result
            .then(() => {
              emit(level, "🔺");
            })
            .catch((e) => {
              emit(LogLevel.ERROR, "🛑 ", "failed", ":", e);
            });
        } else {
          emit(level, "🔺");
          return result;
        }
      } catch (e) {
        emit(LogLevel.ERROR, "🛑", "failed", ":", e);
        throw e;
      }
    };
  };
}

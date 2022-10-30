import { IKernelElement } from "../../kernel";
import { LogLevel } from "../LogLevel";

export function logMethod(level: LogLevel = LogLevel.TRACE) {
  return function (
    target: IKernelElement,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const targetMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const emit = (level: LogLevel, ...parts: any[]) => {
        const that: any = this;
        const logger = that["log"];

        if (logger && logger.emit) logger.emit(level, ...parts);
      };

      try {
        emit(level, "🔻", propertyKey);

        const result = targetMethod.apply(this, args);
        if (result instanceof Promise) {
          result
            .then(() => {
              emit(level, "🔺", propertyKey);
            })
            .catch((e) => {
              emit(LogLevel.ERROR, "🛑 ", propertyKey, "-", "failed", ":", e);
            });
        } else {
          emit(level, "🔺", propertyKey);
        }
      } catch (e) {
        emit(LogLevel.ERROR, "🛑", propertyKey, "-", "failed", ":", e);
        throw e;
      }
    };
  };
}

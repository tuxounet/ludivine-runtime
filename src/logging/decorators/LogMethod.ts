import { IKernel, IKernelElement } from "../../kernel";
import { LogLevels } from "../LogLevels";

export function logMethod(level: LogLevels = "DEBUG") {
  return function (
    target: IKernelElement | IKernel,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const targetMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      const emit = (level: LogLevels, ...parts: any[]) => {
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
              emit("ERROR", "🛑 ", propertyKey, "-", "failed", ":", e);
            });
        } else {
          emit(level, "🔺", propertyKey);
        }
        return result;
      } catch (e) {
        emit("ERROR", "🛑", propertyKey, "-", "failed", ":", e);
        throw e;
      }
    };

    return descriptor;
  };
}

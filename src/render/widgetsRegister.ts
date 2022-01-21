import { ComponentType } from "react";
import { ICompBaseProps, ICompDefinition } from "src/type";

const widgetsRegisteredMap = new Map<string, any>();

(globalThis as any)._debug = {
  compRegisteredMap: widgetsRegisteredMap
};


export function registerWidget<T extends ICompBaseProps = ICompBaseProps>({ type }: ICompDefinition, Comp: ComponentType<T>) {

  if (widgetsRegisteredMap.has(type)) {
    throw new Error(`type ${type} already registered.`);
  }

  widgetsRegisteredMap.set(type, Comp);

  return Comp;
}

export function resolveWidget(type: string) {
  return widgetsRegisteredMap.get(type);
}

export function resetWidgetsMap() {
  widgetsRegisteredMap.clear();
}

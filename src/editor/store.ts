import { createContext } from "react";
import { ISchema } from "src/type";


export class EditorStore {
  #schema: ISchema = null;
  #activeWidgetIdListeners = new Set<(id: string) => void>();
  #widgetSchemaListenersMap: Map<string, Set<(schema: ISchema) => void>> = new Map();
  #activeWidgetId: string = null;

  constructor(schema: ISchema) {
    this.#schema = schema;
  }

  onWidgetSchemaChange(id: string, listener: (_schema: ISchema) => void) {
    let listeners = this.#widgetSchemaListenersMap.get(id);
    if (!listeners) {
      listeners = new Set();
      this.#widgetSchemaListenersMap.set(id, listeners);
    }

    if (!listeners.has(listener)) {
      listeners.add(listener);
    }

    return () => { listeners.delete(listener) };
  }

  updateActiveWidgetSchema(schema: ISchema) {
    if (!this.#widgetSchemaListenersMap.has(schema.id)) {
      return;
    }
    for (let listener of this.#widgetSchemaListenersMap.get(schema.id).values()) {
      listener.call(null, schema);
    }
  }

  setActiveWidgetId(id: string) {
    this.#activeWidgetId = id;
    for (let listener of this.#activeWidgetIdListeners.values()) {
      listener.call(null, this.#activeWidgetId);
    }
  }

  onAcitiveWidgetIdChange(listener: (id: string) => void) {
    if (!this.#activeWidgetIdListeners.has(listener)) {
      this.#activeWidgetIdListeners.add(listener)
    }

    return () => { this.#activeWidgetIdListeners.delete(listener) };
  }


  getActiveWidget() {
    return searchSchemaById(this.#schema, this.#activeWidgetId);
  }

  getSchema() {
    return this.#schema;
  }

}

export const EditorStoreContext = createContext(new EditorStore({ type: 'null', id: 'null' }));

export function searchSchemaById(schema: ISchema, id: string): ISchema | null {
  if (schema?.id === id) {
    return schema;
  }

  for (let prop of Object.keys(schema)) {
    if (typeof schema[prop] === 'object') {
      const result = searchSchemaById(schema[prop], id);
      if (result) return result;
    }
  }

  return null;
}

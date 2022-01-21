import { ForwardedRef, forwardRef, useImperativeHandle, useMemo } from "react";
import CanvasPanel from "./sections/CanvasPanel";
import ConfigPanel from "./sections/ConfigPanel";
import SelectPanel from "./sections/SelectPanel";
import "./editor.css";
import { EditorStoreContext, EditorStore } from "./store";
import { ISchema } from "src/type";

export interface IEdtiorProps {
  schema: ISchema,
  compositionList: any
}

export interface IEdtiorRef  {
  getSchema: () => ISchema;
}

function Editor(props: IEdtiorProps, ref: ForwardedRef<IEdtiorRef>) {
  const { compositionList, schema = { type: "page", body: [] } } = props;

  const eventBus = useMemo(() => {
    return new EditorStore(schema);
  }, [schema]);

  useImperativeHandle(ref, () => ({
    getSchema() {
      return eventBus.getSchema();
    },
  }));

  return (
    <div className="editor row">
      <EditorStoreContext.Provider value={eventBus}>
        <SelectPanel compositionList={compositionList} />
        <CanvasPanel schema={schema} />
        <ConfigPanel />
      </EditorStoreContext.Provider>
    </div>
  );
}

export default forwardRef(Editor);

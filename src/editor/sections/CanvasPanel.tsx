import { IRenderSchemaFn, ISchema } from "src/type";
import { Render } from "../../render";
import DragDropZone from "./components/DragDropZone";

export interface ICanvasPanelProps {
  schema: ISchema;
}

function CanvasPanel({ schema }: ICanvasPanelProps) {

  function batchRender(renderSchema: IRenderSchemaFn, schema: ISchema[]): JSX.Element {
    return <DragDropZone schema={schema} render={renderSchema}></DragDropZone>;
  }

  return (
    <div className="canvas-panel eight columns">
      <Render schema={schema} enhance={{ batchRender }} />
    </div>
  );
}

export default CanvasPanel;

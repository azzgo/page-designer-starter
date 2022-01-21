import { ISchema } from "src/type";
import { IEnhance, useRenderFn } from "./renderFn";

export interface IRenderProps {
  schema: ISchema;
  enhance?: IEnhance;
}


export function Render({ schema, enhance }: IRenderProps): JSX.Element {
  const renderFn = useRenderFn(enhance);
  return <>{schema ? renderFn(schema) : null}</>
}

import React, {useCallback} from "react";
import { ISchema, IBatchRender } from "src/type";
import { resolveWidget } from "./widgetsRegister";

export interface IEnhance {
  batchRender: IBatchRender
}

export function useRenderFn(enhance?: IEnhance) {

  const renderFn = useCallback((schema: ISchema | ISchema[]) => {
    if (Array.isArray(schema)) {
      if (enhance?.batchRender) {
        return enhance.batchRender(renderSchema, schema)
      }
      return schema.map(renderSchema);
    }

    function renderSchema(schema: ISchema): JSX.Element {
      const Comp = schema && resolveWidget(schema.type);

      if (!Comp) {
        return React.createElement("div", null, "[Type] " + schema?.type + " 未注册");
      }

      return React.createElement(Comp, {
        key: schema.id,
        ...schema,
        render: renderFn,
      });
    }

    return renderSchema(schema);
  }, [enhance])

  return renderFn;
}

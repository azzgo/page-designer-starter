export interface ISchema {
  type: string;
  id?: string;
  key?: string;
  [prop: string]: any;
}

export interface IComposition {
  name: string;
  key: string;
  schema: ISchema;
}

export interface ICompBaseProps {
  id: string;
  render: IRenderFn;
}


export interface IRenderSchemaFn {
  (schema: ISchema): JSX.Element
}

export interface IRenderFn {
  (schema: ISchema | ISchema[]): JSX.Element
}

export interface IBatchRender {
  (renderSchema: IRenderSchemaFn, schema: ISchema[]): JSX.Element;
}

export interface ICompDefinition {
  type: string;
}

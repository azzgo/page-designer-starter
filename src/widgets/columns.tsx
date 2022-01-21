import { ICompBaseProps, ISchema } from "src/type";

export interface IColumns extends ICompBaseProps {
  columns: ISchema[],
}

function Columns({ columns, render, id }: IColumns) {
  return (
    <div className="flex-row">
      {columns.map((schema: ISchema, index: number) => (
        <div className="flex-auto" key={id + "_" + index}>
          {render(schema)}
        </div>
      ))}
    </div>
  );
}

export default Columns;

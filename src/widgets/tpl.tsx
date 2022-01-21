import { ICompBaseProps } from "src/type";

export interface ITplProps extends ICompBaseProps {
  tpl: string;
}
function Tpl({ tpl }: ITplProps) {
  return <div>{tpl}</div>;
}

export default Tpl;

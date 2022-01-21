import { ICompBaseProps } from "src/type";

export interface IInputProps extends ICompBaseProps {
  label: string
}

function Input({ label }: IInputProps) {
  return (
    <div>
      <label>{label}</label>
      <input className="u-full-width" />
    </div>
  );
}

export default Input;

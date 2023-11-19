import { ChangeEventHandler, FC, HTMLInputTypeAttribute } from "react";

interface ICustomInput<T> {
  type?: HTMLInputTypeAttribute | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
  onChange?: ChangeEventHandler<T> | undefined;
  name?: string | undefined;
  disabled?: boolean | undefined;
  checked?: boolean | undefined;
  placeholder?: string | undefined;
  required?: boolean | undefined;
  pattern?: string | undefined;
}

const CustomInput: FC<ICustomInput<any>> = ({ type, placeholder, value, onChange, name }) => {
  return (
    <div className="input-container">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input" />
    </div>
  )
}

export default CustomInput;

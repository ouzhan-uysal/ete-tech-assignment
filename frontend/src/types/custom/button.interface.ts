export interface ICustomButton {
  disabled?: boolean | undefined;
  onClick?: () => void;
  name?: string | undefined;
  type?: 'submit' | 'reset' | 'button' | undefined;
  value?: string | ReadonlyArray<string> | number | undefined;
  bgColor: string;
}
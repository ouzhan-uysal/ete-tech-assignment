import { FC } from 'react'
import { ICustomButton } from '../../types/custom/button.interface';

const CustomButton: FC<ICustomButton> = ({ name, onClick, bgColor }) => {
  return (
    <div className="button-container">
      <button type="button" name={name} onClick={onClick} style={{
        backgroundColor: bgColor
      }}>{name}</button>
    </div>
  )
}

export default CustomButton;

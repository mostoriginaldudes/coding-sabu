import { forwardRef, InputHTMLAttributes } from 'react';
import * as Styled from 'styles/Input';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  color?: string;
  onChange?: ({ target }: { target: HTMLInputElement }) => void;
  height?: number;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ name, label, color, onChange, ...attrs }, ref) => {
    return (
      <Styled.InputContainer>
        <Styled.InputLabel htmlFor={name}>{label}</Styled.InputLabel>
        <Styled.InputBox id={name} name={name} onChange={onChange} {...attrs} ref={ref} />
      </Styled.InputContainer>
    );
  }
);

Input.displayName = 'Input';

export default Input;

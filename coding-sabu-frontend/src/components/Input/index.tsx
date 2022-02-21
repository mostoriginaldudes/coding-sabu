import { forwardRef, InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { colors } from '../../styles/theme';
import { flexCenter } from 'styles/module';

const InputContainer = styled.div`
  ${flexCenter}
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: 1em 0;
`;

const InputLabel = styled.label`
  font-size: 13px;
`;

const InputBox = styled.input`
  width: 100%;
  height: ${({ height }) => height}rem;
  border: 1px solid ${colors.black};
  line-height: 2.5;
  padding: 0 0.5em;
  &:focus {
    border: 1px solid ${colors.yellow[4]};
    transition: border 250ms;
  }
  &::placeholder {
    font-size: 0.85rem;
  }
  &:invalid {
    border: 1px solid ${colors.red[7]};
    transition: border 300ms;
  }
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  color?: string;
  onChange?: ({ target }: { target: HTMLInputElement }) => void;
  height?: number;
}

const Input = forwardRef<HTMLInputElement, Props>(
  ({ name, label, color, onChange, ...attrs }, ref) => {
    return (
      <InputContainer>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <InputBox
          id={name}
          name={name}
          onChange={onChange}
          {...attrs}
          ref={ref}
        />
      </InputContainer>
    );
  }
);

export default Input;

import { FC, InputHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { colors } from '../../styles/theme';
import { FlexCol } from 'styles/module';

const InputContainer = styled.div`
  ${FlexCol}
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
`;

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  color?: string;
  onChange: ({ target }: { target: HTMLInputElement }) => void;
  height?: number;
}

const Input: FC<Props> = ({ name, label, onChange, ...attrs }) => {
  return (
    <InputContainer>
      <InputLabel htmlFor={name}>{label}</InputLabel>
      <InputBox
        id={name}
        name={name}
        placeholder={attrs.placeholder}
        onChange={onChange}
        {...attrs}
      />
    </InputContainer>
  );
};

export default Input;

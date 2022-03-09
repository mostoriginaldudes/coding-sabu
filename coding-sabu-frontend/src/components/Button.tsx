import styled from '@emotion/styled';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { colors } from 'styles/modules/theme';
const { yellow, black, white } = colors;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color: 'yellow' | 'black' | 'white';
  children: ReactNode | string;
  radius?: number;
  height?: number;
}

const Button = styled.button<ButtonProps>`
  height: ${({ height }) => height}rem;
  border-radius: ${({ radius }) => radius}px;
  border: ${({ color }) => `1px solid ${color === 'yellow' ? yellow[4] : black}`};
  background-color: ${({ color }) => (color === 'yellow' ? yellow[4] : colors[color])};
  color: ${({ color }) => (color === 'black' ? white : black)};
  padding: 5px 7px;
  font-size: 0.8em;
  cursor: pointer;
  box-shadow: 1px 12px 15px -4px rgba(0, 0, 0, 0.62);

  &:hover {
    box-shadow: 1px 12px 15px 0px rgba(0, 0, 0, 0.62);
    transition: box-shadow 250ms ease;
  }

  &:active {
    box-shadow: 1px 12px 15px -4px rgba(0, 0, 0, 0.3);
    transition: box-shadow 200ms ease;
  }

  & > a {
    color: ${({ color }) => (color === 'black' ? white : black)};
  }
`;

Button.defaultProps = {
  color: 'black',
  radius: 0
} as ButtonProps;

export default Button;

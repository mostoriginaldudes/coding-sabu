import styled from '@emotion/styled';
import { media, colors } from '../../styles/theme';

interface ButtonProps {
  color: 'yellow' | 'black' | 'white';
  radius: number;
}

const Button = styled.button<ButtonProps>`
  border-radius: ${({ radius }) => radius}px;

  border: ${({ color }) =>
    `1px solid ${color === 'yellow' ? colors.yellow[4] : colors.black}`};

  background-color: ${({ color }) =>
    color === 'yellow' ? colors.yellow[4] : colors[color]};

  color: ${({ color }) => (color === 'black' ? colors.white : colors.black)};
  padding: 5px 7px;
  margin-left: 10px;
  font-size: 0.8em;
  cursor: pointer;
  ${media.tablet`
    display: none;
  `}
`;

export default Button;

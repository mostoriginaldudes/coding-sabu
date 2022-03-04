import styled from '@emotion/styled';
import { colors } from 'styles/theme';
import { flexCenter } from 'styles/module';

export const InputContainer = styled.div`
  ${flexCenter}
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  margin: 1em 0;
`;

export const InputLabel = styled.label`
  font-size: 13px;
`;

export const InputBox = styled.input`
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

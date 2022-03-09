import styled from '@emotion/styled';
import { colors } from 'styles/modules/theme';

export const Container = styled.fieldset`
  margin-bottom: 1em;
`;

export const Legend = styled.legend`
  background-color: ${colors.yellow[4]};
  padding: 0.2em 0.3em;
  border-radius: 2px;
  border: 1px solid ${colors.black};
`;

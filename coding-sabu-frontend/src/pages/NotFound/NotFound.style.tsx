import styled from '@emotion/styled';
import { colors } from 'styles/theme';
import Button from 'components/Button';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > h4 {
    color: ${colors.yellow[5]};
    text-decoration: underline;
  }
`;

export const ButtonToBack = styled(Button)`
  font-weight: bold;
  width: 10em;
`;

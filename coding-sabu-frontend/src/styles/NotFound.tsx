import styled from '@emotion/styled';
import Button from 'components/Button';
import { colors } from 'styles/modules/theme';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  & > h4 {
    color: ${colors.yellow[5]};
    text-decoration: underline;
    margin-bottom: 10px;
  }

  & img {
  }
`;

export const ButtonToBack = styled(Button)`
  font-weight: bold;
  width: 10em;
`;

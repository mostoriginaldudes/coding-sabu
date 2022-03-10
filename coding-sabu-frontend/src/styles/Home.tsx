import styled from '@emotion/styled';
import { colors } from './modules/theme';

export const Empty = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & h1 {
    font-size: 2rem;
    margin-bottom: var(--element-gap);
  }
  & svg {
    font-size: 5rem;
    color: ${colors.yellow[5]};
    filter: drop-shadow(4px 4px 10px rgba(252, 196, 25, 0.4));
  }
`;

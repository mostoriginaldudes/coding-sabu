import styled from '@emotion/styled';
import { flexCenter } from './module';
import { media } from './theme';

const Row = styled.div`
  ${flexCenter}
  justify-content: space-between;
  width: 100%;
  margin: 1em 0;

  ${media.tablet`
    flex-direction: column;
  `}

  & > div {
    width: 100%;
  }

  & > button {
    width: 45%;

    ${media.tablet`
      width: 100%;
      margin: 5px 0;
    `}
  }
`;

export default Row;

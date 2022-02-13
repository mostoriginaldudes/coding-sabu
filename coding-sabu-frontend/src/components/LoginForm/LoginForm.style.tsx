import styled from '@emotion/styled';
import { flexCenter } from 'styles/module';
import { colors, media } from 'styles/theme';

export const ButtonContainer = styled.div`
  ${flexCenter}
  justify-content: space-between;
  & > button {
    width: 100%;
    &:first-of-type {
      margin-right: 10px;
    }
  }
  ${media.tablet`
    flex-direction: column;
    justify-content: flex-start;
    & > button {
      &:first-of-type {
        margin: 2em 0 ;
      }
    }
  `}
`;

export const InputError = styled.p`
  font-size: 0.7rem;
  font-weight: bold;
  color: ${colors.red[7]};
`;

import styled from '@emotion/styled';
import { flexCenter } from 'styles/module';
import { colors, media } from 'styles/theme';

export const SignupButtonWrapper = styled.div`
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

export const RadioContainer = styled.ol`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 1em auto;
  & > li {
    display: flex;
  }
`;

export const RadioButton = styled.input`
  background-color: ${colors.white};
  &:checked {
    appearance: none;
    width: 0.7rem;
    height: 0.7rem;
    border-radius: 100%;
    margin-right: 0.1rem;
    background-color: ${colors.yellow[4]};
  }
`;

export const RadioLabel = styled.label`
  font-size: 0.8rem;
`;

export const InputError = styled.p`
  font-size: 0.7rem;
  font-weight: bold;
  color: ${colors.red[7]};
`;

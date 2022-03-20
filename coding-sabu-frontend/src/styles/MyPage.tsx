import styled from '@emotion/styled';
import { colors, media } from 'styles/modules/theme';
import { flexCenter, Row as FlexRow } from 'styles/modules/common';

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
  ${media.tablet`
    width: 100%;
  `}
`;

export const Row = styled(FlexRow)`
  & > div {
    width: 45%;
    ${media.tablet`
      width: 100%;
    `}
  }
`;

export const ButtonWrapper = styled.div`
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

interface UserProfile {
  imgUrl?: string;
}

export const ProfileContainer = styled.div<UserProfile>`
  width: 45%;
  height: 270px;
  background-color: ${colors.gray[1]};
  background-image: url(${({ imgUrl }) => imgUrl});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  & > label {
    ${flexCenter}
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
  ${media.tablet`
    width: 100%;
  `}
`;

export const ProfileInput = styled.input`
  border: none;
  position: absolute;
  opacity: 0;
  z-index: -1;
  &:focus {
    border: none;
  }
`;

export const InputError = styled.p`
  font-size: 0.7rem;
  font-weight: bold;
  color: ${colors.red[7]};
  margin: 0;
`;

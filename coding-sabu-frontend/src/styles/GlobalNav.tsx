import { FC } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Button from 'components/Button';
import { flexCenter, positionFixed } from 'styles/modules/common';
import { colors, media, sizes } from 'styles/modules/theme';

export const { desktop, unitBig, unitRegular } = sizes;
export const { gray, white } = colors;

export const roundStyle = css`
  border-radius: 50%;
`;

export const HeaderContainer = styled.div`
  ${flexCenter}
  ${positionFixed}
  background-image: url('/images/header-background.svg');
  background-position: center;
  background-size: contain;
  background-color: #eee;
  width: 100%;
  box-shadow: rgb(0 0 0 / 25%) 0px 0px 15px;
  z-index: 23;
`;

export const GlobalNavStyle = styled.nav`
  ${flexCenter}
  justify-content: space-between;
  max-width: ${desktop}px;
  width: calc(100% - 2rem);
  height: ${unitBig}px;
  margin: 0 auto;
  position: relative;
`;

export const EmphasisText = styled.h4`
  font-size: 1rem;
`;

export const Image = styled.img`
  width: fit-content;
`;

export const iconContainer = css`
  width: ${unitRegular}px;
  height: ${unitRegular}px;
  padding: 2px;
`;

export const UserDefaultProfileImage = styled(AiOutlineUser)`
  ${flexCenter};
  ${roundStyle}
  ${iconContainer}
  background-color: ${gray[4]};
  margin-left: 10px;
`;

const userProfileStyle = css`
  ${flexCenter}
  ${roundStyle}
  ${iconContainer}
  background-size: auto;
  background-repeat: no-repeat;
  cursor: pointer;
`;

interface Props {
  profileImageUrl: string;
}

export const UserProfileImage: FC<Props> = ({ profileImageUrl }) => {
  return <Image src={profileImageUrl} alt="프로필 사진" css={userProfileStyle} />;
};

export const ButtonToMyClass = styled(Button)`
  ${media.tablet`
    display: none;
  `}
`;

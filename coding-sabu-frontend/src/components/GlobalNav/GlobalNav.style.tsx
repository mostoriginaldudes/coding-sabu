import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { AiOutlineUser } from 'react-icons/ai';
import { FaSearch } from 'react-icons/fa';
import Button from 'components/Button';
import { flexCenter, positionFixed } from 'styles/module';
import { colors, media, sizes } from 'styles/theme';
import headerBackground from 'assets/images/header-background.svg';

export const { desktop, unitBig, unitRegular } = sizes;
export const { gray, white } = colors;

export const RoundStyle = css`
  border-radius: 50%;
`;

export const HeaderContainer = styled.div`
  ${flexCenter}
  ${positionFixed}
  background-image: url(${headerBackground});
  background-position: center;
  background-size: contain;
  background-color: #eee;
  width: 100%;
  box-shadow: rgb(0 0 0 / 25%) 0px 0px 15px;
  z-index: 10;
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

export const IconContainer = css`
  width: ${unitRegular}px;
  height: ${unitRegular}px;
  padding: 2px;
`;

export const UserProfileImage = styled(AiOutlineUser)`
  ${flexCenter};
  ${RoundStyle}
  ${IconContainer}
  background-color: ${gray[4]};
  margin-left: 10px;
`;

export const Search = styled(FaSearch)`
  margin-right: 10px;
`;

export const ButtonToMyClass = styled(Button)`
  ${media.tablet`
    display: none;
  `}
`;

import { useState, useCallback, FC, MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import headerBackground from '../../assets/images/header-background.svg';
import { FaSearch } from 'react-icons/fa';
import { AiFillCaretDown as DownArrow } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { sizes, colors, media } from '../../styles/theme';
import Button from '../Button';
import UserMenu from '../UserMenu';
import { flexCenter, positionFixed, FlexRow } from '../../styles/module';

const { desktop, unitBig, unitRegular } = sizes;
const { gray, white } = colors;

const RoundStyle = css`
  border-radius: 50%;
`;

const HeaderContainer = styled.div`
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

const GlobalNavStyle = styled.nav`
  ${flexCenter}
  justify-content: space-between;
  max-width: ${desktop}px;
  width: calc(100% - 2rem);
  height: ${unitBig}px;
  margin: 0 auto;
  position: relative;
`;

const EmphasisText = styled.h4`
  font-size: 1rem;
`;

const Image = styled.img`
  width: fit-content;
`;

const IconContainer = css`
  width: ${unitRegular}px;
  height: ${unitRegular}px;
  padding: 2px;
`;

const UserProfileImage = styled(AiOutlineUser)`
  ${flexCenter};
  ${RoundStyle}
  ${IconContainer}
  background-color: ${gray[4]};
  margin-left: 10px;
`;

const Search = styled(FaSearch)`
  margin-right: 10px;
`;

const ButtonToMyClass = styled(Button)`
  ${media.tablet`
    display: none;
  `}
`;

const GlobalNav: FC = () => {
  const [visibleUserMenu, setVisibleUserMenu] = useState<boolean>(false);

  const toggleUserMenu = useCallback<MouseEventHandler<HTMLDivElement>>(
    e => {
      e.stopPropagation();
      setVisibleUserMenu(!visibleUserMenu);
    },
    [visibleUserMenu, setVisibleUserMenu]
  );

  return (
    <HeaderContainer data-testid="header">
      <GlobalNavStyle>
        <Link to="/">
          <FlexRow>
            <Image
              src={logo}
              alt="logo"
              width={unitRegular}
              height={unitRegular}
            />
            <EmphasisText>코딩사부</EmphasisText>
          </FlexRow>
        </Link>
        <FlexRow>
          <Link to="/search">
            <Search
              color={gray[8]}
              fontSize={unitRegular / 2}
              cursor="pointer"
              role="search"
            />
          </Link>
          <ButtonToMyClass radius={unitRegular} color="white">
            <Link to="/mylesson">수련 관리</Link>
          </ButtonToMyClass>
          <FlexRow role="toggleMenu" onClick={toggleUserMenu}>
            <UserProfileImage
              color={white}
              fontSize={unitRegular / 3}
              cursor="pointer"
            />
            <DownArrow cursor="pointer" />
            <UserMenu
              visibleUserMenu={visibleUserMenu}
              setVisibleUserMenu={setVisibleUserMenu}
            />
          </FlexRow>
        </FlexRow>
      </GlobalNavStyle>
    </HeaderContainer>
  );
};

export default GlobalNav;

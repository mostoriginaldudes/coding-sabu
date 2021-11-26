import { useState, useCallback, FC } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.svg';
import headerBackground from '../../assets/images/header-background.svg';
import { FaSearch as Search } from 'react-icons/fa';
import { AiFillCaretDown as DownArrow } from 'react-icons/ai';
import { AiOutlineUser as UserProfileImage } from 'react-icons/ai';
import { sizes, colors } from '../../styles/theme';
import Button from '../Button';
import UserMenu from '../UserMenu';

const { desktop, unitBig, unitRegular } = sizes;
const { gray, white } = colors;

const FlexContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FixedPosition = css`
  position: fixed;
  top: 0;
  left: 0;
`;

const RoundStyle = css`
  border-radius: 50%;
`;

const HeaderContainer = styled.div`
  ${FlexContainer}
  ${FixedPosition}
  width: 100%;
  background-image: url(${headerBackground});
  background-position: center;
  background-size: contain;
  background-color: #eee;
  box-shadow: rgb(0 0 0 / 25%) 0px 0px 15px;
`;

const GlobalNavStyle = styled.nav`
  ${FlexContainer}
  justify-content: space-between;
  max-width: ${desktop}px;
  width: calc(100% - 2rem);
  height: ${unitBig}px;
  margin: 0 auto;
  position: relative;
`;

const GlobalNavContainer = styled.div`
  ${FlexContainer};
  height: 100%;
`;

const EmphasisText = styled.h4`
  font-size: 1.3rem;
`;

const Image = styled.img`
  width: fit-content;
`;

const IconContainer = css`
  width: ${unitRegular}px;
  height: ${unitRegular}px;
  padding: 2px;
`;

const RoundContainer = styled.div`
  ${FlexContainer};
  ${RoundStyle}
  ${IconContainer}
  background-color: ${gray[4]};
  margin-left: 10px;
`;

const GlobalNav: FC = () => {
  const [visibleUserMenu, setVisibleUserMenu] = useState<boolean>(false);

  const toggleUserMenu = useCallback(
    e => {
      e.stopPropagation();
      console.log(2);
      setVisibleUserMenu(!visibleUserMenu);
    },
    [visibleUserMenu, setVisibleUserMenu]
  );

  return (
    <HeaderContainer data-testid="header">
      <GlobalNavStyle>
        <Link to="/">
          <GlobalNavContainer>
            <Image
              src={logo}
              alt="logo"
              width={unitRegular}
              height={unitRegular}
            />
            <EmphasisText>코딩사부</EmphasisText>
          </GlobalNavContainer>
        </Link>
        <GlobalNavContainer>
          <GlobalNavContainer>
            <Link to="/search">
              <Search
                color={gray[8]}
                fontSize={unitRegular / 2}
                cursor="pointer"
                role="search"
              />
            </Link>
          </GlobalNavContainer>
          <GlobalNavContainer>
            <Button radius={unitRegular} color="white">
              <Link to="/myclass">수련 관리</Link>
            </Button>
          </GlobalNavContainer>
          <GlobalNavContainer role="toggleMenu" onClick={toggleUserMenu}>
            <RoundContainer>
              <UserProfileImage
                color={white}
                fontSize={unitRegular / 2}
                cursor="pointer"
              />
            </RoundContainer>
            <DownArrow cursor="pointer" />
            <UserMenu
              visibleUserMenu={visibleUserMenu}
              setVisibleUserMenu={setVisibleUserMenu}
            />
          </GlobalNavContainer>
        </GlobalNavContainer>
      </GlobalNavStyle>
    </HeaderContainer>
  );
};

export default GlobalNav;

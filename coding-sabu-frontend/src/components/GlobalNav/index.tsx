import { useState, useCallback, FC } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import headerBackground from "../../assets/images/header-background.png";
import { FaSearch as Search } from "react-icons/fa";
import { AiFillCaretDown as DownArrow } from "react-icons/ai";
import { AiOutlineUser as UserProfileImage } from "react-icons/ai";
import { sizes, media, colors } from "../../styles/theme";
import Button from "../Button";
import UserMenu from "../UserMenu";

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
  background-size: cover;
  box-shadow: rgb(0 0 0 / 25%) 0px 0px 15px;
`;

const GlobalNavStyle = styled.header`
  ${FlexContainer}
  justify-content: space-between;
  width: calc(100% - 2rem);
  height: 80px;
  margin: 0 auto;
`;

const GlobalNavContainer = styled.div`
  ${FlexContainer};
  height: 100%;
`;

const EmphasisText = styled.h4`
  font-size: 1.3rem;
  ${media.tablet`
    display: none;
  `}
`;

const Image = styled.img`
  width: fit-content;
`;

const IconContainer = css`
  width: ${sizes.unitDesktop};
  height: ${sizes.unitDesktop};

  ${media.tablet`
    width: ${sizes.unitTablet};
    height: ${sizes.unitTablet};
  `}
`;

const RoundContainer = styled.div`
  ${FlexContainer};
  ${RoundStyle}
  ${IconContainer}
  background-color: ${colors.gray[4]};
  margin-left: 10px;
`;

const GlobalNav: FC = () => {
  const [visibleUserMenu, setVisibleUserMenu] = useState<boolean>(false);

  const toggleUserMenu = useCallback(
    () => setVisibleUserMenu(!visibleUserMenu),
    [visibleUserMenu, setVisibleUserMenu]
  );

  return (
    <HeaderContainer>
      <GlobalNavStyle>
        <Link to='/'>
          <GlobalNavContainer>
            <Image
              src={logo}
              alt='logo'
              width={sizes.unitTablet}
              height={sizes.unitTablet}
            />
            <EmphasisText>코딩사부</EmphasisText>
          </GlobalNavContainer>
        </Link>
        <GlobalNavContainer>
          <GlobalNavContainer>
            <Link to='/search'>
              <Search
                color={colors.gray[8]}
                fontSize={`calc(${sizes.unitTablet}/2)`}
                cursor='pointer'
                role='search'
              />
            </Link>
          </GlobalNavContainer>
          <GlobalNavContainer>
            <Button radius={sizes.unitTablet} color='white'>
              <Link to='/myclass'>수련 관리</Link>
            </Button>
          </GlobalNavContainer>
          <GlobalNavContainer onClick={toggleUserMenu} role='toggleMenu'>
            <RoundContainer>
              <UserProfileImage
                color={colors.white}
                fontSize={`calc(${sizes.unitTablet} - 10px)`}
                cursor='pointer'
              />
            </RoundContainer>
            <DownArrow cursor='pointer' />
          </GlobalNavContainer>
        </GlobalNavContainer>
        {visibleUserMenu && <UserMenu />}
      </GlobalNavStyle>
    </HeaderContainer>
  );
};

export default GlobalNav;

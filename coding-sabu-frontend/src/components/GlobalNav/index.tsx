import { useState, useCallback, FC, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { AiFillCaretDown as DownArrow } from 'react-icons/ai';
import UserMenu from '../UserMenu';
import logo from 'assets/images/logo.svg';
import { FlexRow } from 'styles/module';
import {
  EmphasisText,
  GlobalNavStyle,
  gray,
  HeaderContainer,
  Image,
  Search,
  unitRegular,
  ButtonToMyClass,
  UserProfileImage,
  white
} from './GlobalNav.style';

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

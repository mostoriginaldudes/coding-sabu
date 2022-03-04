import { useState, useCallback, useMemo, FC, memo, MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillCaretDown as DownArrow } from 'react-icons/ai';
import LoginForm from 'components/LoginForm';
import SignupForm from 'components/SignupForm';
import Button from 'components/Button';
import UserMenu from 'components/UserMenu';
import { RootState } from 'store';
import { showAuthForm } from 'store/ui';
import logo from 'assets/images/logo.svg';
import { FlexRow } from 'styles/module';
import {
  EmphasisText,
  GlobalNavStyle,
  HeaderContainer,
  Image,
  unitRegular,
  ButtonToMyClass,
  UserDefaultProfileImage,
  white,
  UserProfileImage
} from './GlobalNav.style';

const GlobalNav: FC = () => {
  const [authModalType, setAuthModalType] = useState<'login' | 'signup'>('login');
  const [visibleUserMenu, setVisibleUserMenu] = useState<boolean>(false);
  const { token, user, visibleAuthForm } = useSelector((state: RootState) => ({
    token: state.auth.token,
    user: state.auth.user,
    visibleAuthForm: state.ui.visibleAuthForm
  }));
  const dispatch = useDispatch();

  const setModalToRender = useCallback(
    modalType => setAuthModalType(modalType),
    [setAuthModalType]
  );

  const toggleUserMenu = useCallback<MouseEventHandler<HTMLDivElement>>(
    e => {
      e.stopPropagation();
      setVisibleUserMenu(!visibleUserMenu);
    },
    [visibleUserMenu, setVisibleUserMenu]
  );

  const dispatchShowAuthForm = useCallback(() => dispatch(showAuthForm()), [dispatch]);

  const isLoggedIn = useMemo(() => Boolean(token && user.data), [token, user]);

  const profileImage = useMemo(
    () => (user.data?.profileImage === 'img/default.png' ? false : user.data?.profileImage),
    [user]
  );

  return (
    <HeaderContainer data-testid="header">
      <GlobalNavStyle>
        <Link to="/">
          <FlexRow>
            <Image src={logo} alt="logo" width={unitRegular} height={unitRegular} />
            <EmphasisText>코딩사부</EmphasisText>
          </FlexRow>
        </Link>
        {isLoggedIn ? (
          <FlexRow role="toggleMenu" onClick={toggleUserMenu}>
            <ButtonToMyClass radius={unitRegular} color="white">
              <Link to="/mylesson">수련 관리</Link>
            </ButtonToMyClass>
            {profileImage ? (
              <UserProfileImage profileImageUrl={profileImage} />
            ) : (
              <UserDefaultProfileImage color={white} fontSize={unitRegular / 3} cursor="pointer" />
            )}
            <DownArrow cursor="pointer" />
            <UserMenu
              userInfo={user.data}
              visibleUserMenu={visibleUserMenu}
              setVisibleUserMenu={setVisibleUserMenu}
            />
          </FlexRow>
        ) : (
          <>
            <Button color="black" radius={15} onClick={dispatchShowAuthForm}>
              로그인
            </Button>
            {authModalType === 'login' ? (
              <LoginForm
                setModalToRender={setModalToRender}
                visibleAuthForm={visibleAuthForm}
                user={user}
              />
            ) : (
              <SignupForm
                setModalToRender={setModalToRender}
                visibleAuthForm={visibleAuthForm}
                user={user}
              />
            )}
          </>
        )}
      </GlobalNavStyle>
    </HeaderContainer>
  );
};

export default memo(GlobalNav);

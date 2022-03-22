import Link from 'next/link';
import { FC, useState, useEffect, useCallback, useMemo, memo, MouseEventHandler } from 'react';
import { AiFillCaretDown as DownArrow } from 'react-icons/ai';
import LoginForm from 'components/LoginForm';
import SignupForm from 'components/SignupForm';
import Button from 'components/Button';
import UserMenu from 'components/UserMenu';
import AUTH_SUCCESS from 'fixtures/auth/success';
import AUTH_FAIL from 'fixtures/auth/fail';
import useRedux from 'hooks/useRedux';
import { fetchMyJoiningLessons, fetchMyTeachingLessons } from 'store/lesson';
import { hideAuthForm, showAuthForm, showHud } from 'store/ui';
import { FlexRow } from 'styles/modules/common';
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
} from 'styles/GlobalNav';

const GlobalNav: FC = () => {
  const [authModalType, setAuthModalType] = useState<'login' | 'signup'>('login');
  const [visibleUserMenu, setVisibleUserMenu] = useState<boolean>(false);

  const { useAppDispatch, useAppSelector } = useRedux();

  const dispatch = useAppDispatch();

  const { token, user, visibleAuthForm } = useAppSelector(state => ({
    token: state.auth.token,
    user: state.auth.user,
    visibleAuthForm: state.ui.visibleAuthForm
  }));

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
    () =>
      user.data?.profileImage === '/static/images/profile/default.png'
        ? false
        : user.data?.profileImage,
    [user]
  );

  const displayLoginSuccess = useCallback(() => {
    if (user.data) {
      dispatch(showHud(AUTH_SUCCESS.LOGIN));
      dispatch(hideAuthForm());
      dispatch(fetchMyJoiningLessons());
      if (user.data.userType === 'teacher') {
        dispatch(fetchMyTeachingLessons());
      }
    }
  }, [user, dispatch]);

  const displayLoginFail = useCallback(() => {
    if (user.error) {
      dispatch(showHud(AUTH_FAIL.LOGIN));
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (!user.loading) {
      displayLoginSuccess();
      displayLoginFail();
    }
  }, [user, displayLoginSuccess, displayLoginFail]);

  return (
    <HeaderContainer data-testid="header">
      <GlobalNavStyle>
        <Link href="/" passHref>
          <FlexRow style={{ cursor: 'pointer' }}>
            <Image src="/images/logo.svg" alt="logo" width={unitRegular} height={unitRegular} />
            <EmphasisText>코딩사부</EmphasisText>
          </FlexRow>
        </Link>
        {isLoggedIn ? (
          <FlexRow role="toggleMenu">
            <ButtonToMyClass radius={unitRegular} color="white">
              <Link href="/mylesson">수련 관리</Link>
            </ButtonToMyClass>
            <FlexRow onClick={toggleUserMenu}>
              {profileImage ? (
                <UserProfileImage profileImageUrl={profileImage} />
              ) : (
                <UserDefaultProfileImage
                  color={white}
                  fontSize={unitRegular / 3}
                  cursor="pointer"
                />
              )}
              <DownArrow cursor="pointer" />
            </FlexRow>
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

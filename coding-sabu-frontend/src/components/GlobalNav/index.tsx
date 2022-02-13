import {
  FC,
  useState,
  useEffect,
  useCallback,
  memo,
  MouseEventHandler,
  useMemo
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AiFillCaretDown as DownArrow } from 'react-icons/ai';
import LoginForm from 'components/LoginForm';
import SignupForm from 'components/SignupForm';
import Button from 'components/Button';
import UserMenu from 'components/UserMenu';
import { RootState } from 'store';
import {
  createActionInvisibleAuthForm,
  createActionStatusTextHud,
  createActionVisibleAuthForm,
  createActionVisibleHud
} from 'store/ui';
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
  const [authModalType, setAuthModalType] = useState<'login' | 'signup'>(
    'login'
  );
  const [visibleUserMenu, setVisibleUserMenu] = useState<boolean>(false);
  const { user, visibleAuthForm } = useSelector((state: RootState) => ({
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

  const showAuthForm = useCallback(
    () => dispatch(createActionVisibleAuthForm()),
    [dispatch]
  );

  const isLoggedIn = useMemo(() => Boolean(user.data), [user]);

  const displayLoginSuccessResult = useCallback(() => {
    dispatch(createActionStatusTextHud('success'));
    dispatch(createActionVisibleHud());
    dispatch(createActionInvisibleAuthForm());
  }, [dispatch]);

  const displayLoginFailResult = useCallback(() => {
    dispatch(createActionStatusTextHud('fail'));
    dispatch(createActionVisibleHud());
  }, [dispatch]);

  useEffect(() => {
    user.data && displayLoginSuccessResult();
    user.error && displayLoginFailResult();
  }, [user, displayLoginSuccessResult, displayLoginFailResult]);

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
          {isLoggedIn && (
            <ButtonToMyClass radius={unitRegular} color="white">
              <Link to="/mylesson">수련 관리</Link>
            </ButtonToMyClass>
          )}
          {isLoggedIn ? (
            <FlexRow role="toggleMenu" onClick={toggleUserMenu}>
              <UserProfileImage
                color={white}
                fontSize={unitRegular / 3}
                cursor="pointer"
              />
              <DownArrow cursor="pointer" />
              <UserMenu
                userInfo={user.data}
                visibleUserMenu={visibleUserMenu}
                setVisibleUserMenu={setVisibleUserMenu}
              />
            </FlexRow>
          ) : (
            <>
              <Button color="black" radius={15} onClick={showAuthForm}>
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
        </FlexRow>
      </GlobalNavStyle>
    </HeaderContainer>
  );
};

export default memo(GlobalNav);

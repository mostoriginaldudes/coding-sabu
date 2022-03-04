import { FC, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import useClickOutside from 'hooks/useClickOutside';
import { User } from 'types';
import * as Styled from './UserMenu.style';

interface Props {
  userInfo: User | null;
  visibleUserMenu: boolean;
  setVisibleUserMenu: (visibleUserMenu: boolean) => void;
}

const UserMenu: FC<Props> = ({
  userInfo,
  visibleUserMenu,
  setVisibleUserMenu
}) => {
  const offUserMenu = useCallback(() => {
    setVisibleUserMenu(false);
  }, [setVisibleUserMenu]);

  const userMenu = useRef(null);
  useClickOutside(userMenu, offUserMenu);

  return (
    <div ref={userMenu}>
      {visibleUserMenu && (
        <Styled.Container role="userMenu">
          <Styled.List>
            <Link to="/mypage">내 정보</Link>
          </Styled.List>
          <Styled.List>
            <Link to="/mylesson">내 수련</Link>
          </Styled.List>
          {userInfo?.userType === 'teacher' && (
            <Styled.List>
              <Link to="/myteaching">내 가르침</Link>
            </Styled.List>
          )}
          <Styled.List>
            <Link to="/logout">로그아웃</Link>
          </Styled.List>
        </Styled.Container>
      )}
    </div>
  );
};

export default UserMenu;

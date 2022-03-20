import Link from 'next/link';
import { FC, useCallback, useRef } from 'react';
import useClickOutside from 'hooks/useClickOutside';
import * as Styled from 'styles/UserMenu';
import { User } from 'types';

interface Props {
  userInfo: User | null;
  visibleUserMenu: boolean;
  setVisibleUserMenu: (visibleUserMenu: boolean) => void;
}

const UserMenu: FC<Props> = ({ userInfo, visibleUserMenu, setVisibleUserMenu }) => {
  const offUserMenu = useCallback(() => {
    setVisibleUserMenu(false);
  }, [setVisibleUserMenu]);

  const userMenu = useRef(null);
  useClickOutside(userMenu, offUserMenu);

  return (
    <div ref={userMenu}>
      {visibleUserMenu && (
        <Styled.Container role="userMenu" onClick={offUserMenu}>
          <Styled.List>
            <Link href="/mypage">내 정보</Link>
          </Styled.List>
          <Styled.List>
            <Link href="/mylesson">내 수련</Link>
          </Styled.List>
          {userInfo?.userType === 'teacher' && (
            <Styled.List>
              <Link href="/teaching">내 가르침</Link>
            </Styled.List>
          )}
          <Styled.List>
            <Link href="/logout">로그아웃</Link>
          </Styled.List>
        </Styled.Container>
      )}
    </div>
  );
};

export default UserMenu;

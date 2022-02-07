import { FC, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors, sizes } from '../../styles/theme';
import { flexCenter } from '../../styles/module';
import useClickOutside from '../../hooks/useClickOutside';

const UserMenuContainer = styled.ul`
  width: 163px;
  box-shadow: rgb(0 0 0 / 25%) 0px 0px 15px;
  position: absolute;
  top: ${sizes.unitBig + 4}px;
  right: 0;
  background-color: ${colors.white};
`;

const UserMenuList = styled.li`
  ${flexCenter}
  width: 100%;
  height: 36px;
  cursor: pointer;
  &:hover {
    background-color: ${colors.yellow[4]};
  }
  & > a {
    width: 100%;
    height: 100%;
    ${flexCenter}
  }
`;

interface Props {
  visibleUserMenu: boolean;
  setVisibleUserMenu: (visibleUserMenu: boolean) => void;
}

const UserMenu: FC<Props> = ({ visibleUserMenu, setVisibleUserMenu }) => {
  const offUserMenu = useCallback(() => {
    setVisibleUserMenu(false);
  }, [setVisibleUserMenu]);

  const userMenu = useRef(null);
  useClickOutside(userMenu, offUserMenu);

  return (
    <div ref={userMenu}>
      {visibleUserMenu && (
        <UserMenuContainer role="userMenu">
          <UserMenuList>
            <Link to="/mypage">내 정보</Link>
          </UserMenuList>
          <UserMenuList>
            <Link to="/myteaching">내 가르침</Link>
          </UserMenuList>
          <UserMenuList>
            <Link to="/logout">로그아웃</Link>
          </UserMenuList>
        </UserMenuContainer>
      )}
    </div>
  );
};

export default UserMenu;

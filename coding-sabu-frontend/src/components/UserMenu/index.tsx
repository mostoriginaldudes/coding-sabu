import { FC, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors, sizes } from '../../styles/theme';
import useClickOutside from '../../hooks/useClickOutside';

const FlexContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserMenuContainer = styled.ul`
  width: 163px;
  box-shadow: rgb(0 0 0 / 25%) 0px 0px 15px;
  position: absolute;
  top: ${sizes.unitBig + 4}px;
  right: 0;
`;

const UserMenuList = styled.li`
  ${FlexContainer}
  width: 100%;
  height: 36px;
  &:hover {
    background-color: ${colors.yellow[4]};
  }
  cursor: pointer;
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
            <Link to="/myclass">내 가르침</Link>
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

import { FC, useCallback } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { colors, sizes } from '../../styles/theme';

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

const UserMenu: FC<RouteComponentProps> = ({ history }) => {
  const navigatePage = useCallback(
    path => {
      history.push(path);
    },
    [history]
  );

  const logout = useCallback(() => {
    // TODO: store의 유저 정보 삭제 로직 추가
    history.replace('/');
  }, [history]);

  return (
    <UserMenuContainer role="userMenu">
      <UserMenuList onClick={() => navigatePage('/mypage')}>
        내 정보
      </UserMenuList>
      <UserMenuList onClick={() => navigatePage('/myclass')}>
        내 가르침
      </UserMenuList>
      <UserMenuList onClick={logout}>로그아웃</UserMenuList>
    </UserMenuContainer>
  );
};

export default withRouter(UserMenu);

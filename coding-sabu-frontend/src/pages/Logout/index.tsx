/** @jsxImportSource @emotion/react */
import { useState, useEffect, useCallback, FC } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { logout } from 'store/auth';
import { showHud } from 'store/ui';
import { colors } from 'styles/theme';
import AUTH_SUCCESS from 'fixtures/auth/success';
import loadable from '@loadable/component';

const Loader = loadable(() => import('components/Loader'));

const style = css`
  & > h2 {
    text-align: center;
    color: ${colors.black};
  }
`;

const Logout: FC = () => {
  const [readyToRedirect, setReadyToRedirect] = useState<boolean>(false);
  const dispatch = useDispatch();

  const dispatchLogout = useCallback(async () => {
    await dispatch(logout());
    await dispatch(showHud(AUTH_SUCCESS.LOGOUT));
    setTimeout(() => setReadyToRedirect(true), 750);
  }, [dispatch]);

  useEffect(() => {
    dispatchLogout();
  }, [dispatchLogout]);

  return (
    <div css={style}>
      <Loader loading={true} />
      <h2>로그아웃을 진행중입니다.</h2>
      {readyToRedirect && <Redirect to="/" />}
    </div>
  );
};

export default Logout;

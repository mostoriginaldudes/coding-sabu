import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { logout, setToken } from 'store/auth';
import { showHud } from 'store/ui';
import { colors } from 'styles/modules/theme';
import AUTH_SUCCESS from 'fixtures/auth/success';
import Loader from 'components/Loader';
import Head from 'next/head';

const style = css`
  & > h2 {
    text-align: center;
    color: ${colors.black};
  }
`;

export default function Logout() {
  const router = useRouter();
  const [readyToRedirect, setReadyToRedirect] = useState<boolean>(false);
  const dispatch = useDispatch();

  const dispatchLogout = useCallback(async () => {
    await dispatch(logout());
    await dispatch(setToken(null));
    await dispatch(showHud(AUTH_SUCCESS.LOGOUT));
    setTimeout(() => setReadyToRedirect(true), 750);
  }, [dispatch]);

  useEffect(() => {
    readyToRedirect && router.replace('/');
  }, [readyToRedirect]);

  useEffect(() => {
    dispatchLogout();
  }, [dispatchLogout]);

  return (
    <div css={style}>
      <Head>
        <title>로그아웃 | 코딩사부</title>
      </Head>
      <Loader loading={true} />
      <h2>로그아웃을 진행중입니다.</h2>
    </div>
  );
}

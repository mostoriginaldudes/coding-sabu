/** @jsxImportSource @emotion/react */
import { FC, useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { css } from '@emotion/react';
import { createActionLogout } from 'store/auth';
import useTimeout from 'hooks/useTimeout';
import Loader from 'styles/Loader';
import { colors } from 'styles/theme';

const style = css`
  & > h2 {
    text-align: center;
    color: ${colors.black};
  }
`;

const Logout: FC = () => {
  const [readyToRedirect, setReadyToRedirect] = useState<boolean>(false);
  const dispatch = useDispatch();

  const logout = useCallback(() => {
    dispatch(createActionLogout());
    setReadyToRedirect(true);
  }, [dispatch]);

  useTimeout(logout, 500);

  return (
    <div css={style}>
      <Loader loading={true} />
      <h2>로그아웃을 진행중입니다.</h2>
      {readyToRedirect && <Redirect to="/" />}
    </div>
  );
};

export default Logout;

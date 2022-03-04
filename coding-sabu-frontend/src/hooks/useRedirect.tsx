import { showHud } from 'store/ui';
import AUTH_FAIL from 'fixtures/auth/fail';
import { Redirect } from 'react-router-dom';
import { DependencyList, useEffect } from 'react';

const redirectWhenUnauthorized = (path: string) => {
  showHud(AUTH_FAIL.UNAUTHORIZED);
  return <Redirect to={path} />;
};

export default function useRedirect(path: string, deps: DependencyList) {
  useEffect(() => {
    redirectWhenUnauthorized(path);
  }, [path, deps]);
}

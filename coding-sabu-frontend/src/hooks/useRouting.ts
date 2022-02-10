import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';

interface RouteHookObject {
  forward: (path: string) => void;
  replace: (path: string) => void;
  back: () => void;
}

function useRouting() {
  const history = useHistory();

  const route: RouteHookObject = {
    forward: useCallback(path => history.push(path), [history]),
    replace: useCallback(path => history.replace(path), [history]),
    back: useCallback(() => history.goBack(), [history])
  };

  return route;
}

export default useRouting;

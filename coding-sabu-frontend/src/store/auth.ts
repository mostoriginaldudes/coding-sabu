import { ThunkAsyncState, ThunkDispatch } from '.';

// constants
const LOGIN = 'auth/LOGIN' as const;
const LOGIN_FAIL = 'auth/LOGIN_FAIL' as const;
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS' as const;
const LOGOUT = 'auth/LOGOUT' as const;
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS' as const;
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL' as const;

// types
interface State {
  readonly authToken: ThunkAsyncState<string>;
  readonly refreshToken: ThunkAsyncState<string>;
}

type ActionType =
  | typeof LOGIN
  | typeof LOGIN_SUCCESS
  | typeof LOGIN_FAIL
  | typeof LOGOUT
  | typeof LOGOUT_SUCCESS
  | typeof LOGOUT_FAIL;

interface Action {
  type: ActionType;
  payload?: State;
}

// state
const initialState: State = {
  authToken: {
    loading: false,
    data: null,
    error: null
  },
  refreshToken: {
    loading: false,
    data: null,
    error: null
  }
};

// reducer
export default function authReducer(
  state: State = initialState,
  action: Action
) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        refreshToken: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        authToken: null,
        refreshToken: null
      };
    default:
      return state;
  }
}

// action creator
export const login =
  ({ email, password }: { email: string; password: string }) =>
  (dispatch: ThunkDispatch) => {
    dispatch({ loading: true, data: null, error: null });
    try {
      // TODO login request api
      dispatch({ loading: false });
    } catch (error) {}
  };

export const logout = () => (dispatch: ThunkDispatch) => {
  dispatch({ type: LOGOUT });
  try {
    // TODO logout request api
    dispatch({ type: LOGOUT_SUCCESS, data: null, error: null });
    // TODO redirect to home
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, data: null, error: error });
  }
};

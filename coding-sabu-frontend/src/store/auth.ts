import { ThunkAsyncState } from '.';
import { ThunkAction } from 'redux-thunk';
import { LoginInfo, SignupInfo, User } from 'types';
import { login, signup } from 'apis';

// constants
const LOGIN = 'auth/LOGIN' as const;
const LOGIN_FAIL = 'auth/LOGIN_FAIL' as const;
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS' as const;
const SIGNUP = 'auth/SIGNUP' as const;
const SIGNUP_FAIL = 'auth/SIGNUP_FAIL' as const;
const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS' as const;
const SET_TOKEN = 'auth/SET_TOKEN' as const;
const LOGOUT = 'auth/LOGOUT' as const;

// types
interface State {
  readonly token: string | null;
  readonly user: ThunkAsyncState<User>;
}

type Action =
  | { type: typeof LOGIN }
  | { type: typeof LOGIN_SUCCESS; payload: User }
  | { type: typeof LOGIN_FAIL; payload: Error }
  | { type: typeof SIGNUP }
  | { type: typeof SIGNUP_SUCCESS; payload: User }
  | { type: typeof SIGNUP_FAIL; payload: Error }
  | { type: typeof SET_TOKEN; payload: Pick<State, 'token'> }
  | { type: typeof LOGOUT };

type AuthThunkAction = ThunkAction<void, State, null, Action>;

// action creator
export const createActionLogin =
  (loginInfo: LoginInfo): AuthThunkAction =>
  async dispatch => {
    dispatch({ type: LOGIN });
    try {
      const user = await login(loginInfo);
      dispatch({ type: LOGIN_SUCCESS, payload: user });
    } catch (error) {
      dispatch({ type: LOGIN_FAIL, payload: error as Error });
    }
  };

export const createActionSignup =
  (signupInfo: SignupInfo): AuthThunkAction =>
  async dispatch => {
    dispatch({ type: SIGNUP });
    try {
      const user = await signup(signupInfo);
      dispatch({ type: SIGNUP_SUCCESS, payload: user });
    } catch (error) {
      dispatch({ type: SIGNUP_FAIL, payload: error as Error });
    }
  };

export const createActionLogout = () => ({ type: LOGOUT });

// state
const initialState: State = {
  token: null,
  user: {
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
        user: {
          loading: true,
          data: null,
          error: null
        }
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case LOGIN_FAIL:
      return {
        ...state,
        user: {
          loading: false,
          data: null,
          error: action.payload
        }
      };
    case SIGNUP:
      return {
        ...state,
        user: {
          loading: true,
          data: null,
          error: null
        }
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        user: {
          loading: false,
          data: action.payload,
          error: null
        }
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        user: {
          loading: false,
          data: null,
          error: action.payload
        }
      };
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload
      };
    case LOGOUT:
      return {
        ...state,
        token: null,
        user: {
          loading: false,
          data: null,
          error: null
        }
      };
    default:
      return state;
  }
}

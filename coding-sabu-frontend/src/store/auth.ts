import { ThunkAsyncState } from '.';
import { ThunkAction } from 'redux-thunk';
import { produce } from 'immer';
import { LoginInfo, SignupInfo, User } from 'types';
import { editUser, login, logout, signup } from 'apis';

// constants
const LOGIN = 'auth/LOGIN' as const;
const LOGIN_FAIL = 'auth/LOGIN_FAIL' as const;
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS' as const;
const SIGNUP = 'auth/SIGNUP' as const;
const SIGNUP_FAIL = 'auth/SIGNUP_FAIL' as const;
const SIGNUP_SUCCESS = 'auth/SIGNUP_SUCCESS' as const;
const SET_TOKEN = 'auth/SET_TOKEN' as const;
const LOGOUT = 'auth/LOGOUT' as const;
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS' as const;
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL' as const;
const EDIT_USER = 'auth/EDIT_USER' as const;
const EDIT_USER_SUCCESS = 'auth/EDIT_USER_SUCCESS' as const;
const EDIT_USER_FAIL = 'auth/EDIT_USER_FAIL' as const;

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
  | { type: typeof SIGNUP_SUCCESS }
  | { type: typeof SIGNUP_FAIL; payload: Error }
  | { type: typeof SET_TOKEN; payload: string | null }
  | { type: typeof LOGOUT }
  | { type: typeof LOGOUT_SUCCESS }
  | { type: typeof LOGOUT_FAIL }
  | { type: typeof EDIT_USER }
  | { type: typeof EDIT_USER_SUCCESS; payload: User }
  | { type: typeof EDIT_USER_FAIL; payload: Error };

type AuthThunkAction = ThunkAction<void, State, null, Action>;

// action creator
export const createActionLogin =
  (loginInfo: LoginInfo): AuthThunkAction =>
  async dispatch => {
    dispatch({ type: LOGIN });
    try {
      const user: User = await login(loginInfo);
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
      await signup(signupInfo);
      dispatch({ type: SIGNUP_SUCCESS });
    } catch (error) {
      dispatch({ type: SIGNUP_FAIL, payload: error as Error });
    }
  };

export const createActionSetToken = (token: string | null) => ({
  type: SET_TOKEN,
  payload: token
});

export const createActionLogout = (): AuthThunkAction => async dispatch => {
  dispatch({ type: LOGOUT });
  try {
    await logout();
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL });
  }
};

export const createActionEditUser =
  (userInfoFormData: FormData): AuthThunkAction =>
  async dispatch => {
    dispatch({ type: EDIT_USER });
    try {
      const user = await editUser(userInfoFormData);
      dispatch({ type: EDIT_USER_SUCCESS, payload: user });
    } catch (error) {
      dispatch({ type: EDIT_USER_FAIL, payload: error as Error });
    }
  };

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
export default function authReducer(state = initialState, action: Action) {
  return produce(state, draft => {
    switch (action.type) {
      case LOGIN:
        draft.user.loading = true;
        draft.user.data = null;
        draft.user.error = null;
        break;
      case LOGIN_SUCCESS:
        draft.user = {
          loading: false,
          data: action.payload,
          error: null
        };
        break;
      case LOGIN_FAIL:
        draft.user.loading = false;
        draft.user.data = null;
        draft.user.error = action.payload;
        break;
      case SIGNUP:
        draft.user = {
          loading: true,
          data: null,
          error: null
        };
        break;
      case SIGNUP_SUCCESS:
        draft.user = {
          loading: false,
          data: null,
          error: null
        };
        break;
      case SIGNUP_FAIL:
        draft.user = {
          loading: false,
          data: null,
          error: action.payload
        };
        break;
      case SET_TOKEN:
        draft.token = action.payload;
        break;
      case LOGOUT:
        break;
      case LOGOUT_SUCCESS:
        draft.token = null;
        draft.user.loading = false;
        draft.user.data = null;
        draft.user.error = null;
        break;
      case LOGOUT_FAIL:
        break;
      case EDIT_USER:
        draft.user.loading = true;
        draft.user.data = null;
        draft.user.error = null;
        break;
      case EDIT_USER_SUCCESS:
        draft.user.loading = false;
        draft.user.data = action.payload;
        draft.user.error = null;
        break;
      case EDIT_USER_FAIL:
        draft.user.loading = false;
        draft.user.data = null;
        draft.user.error = action.payload;
        break;
      default:
        return state;
    }
  });
}

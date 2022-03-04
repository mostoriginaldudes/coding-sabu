import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAsyncState } from '.';
import { LoginInfo, SignupInfo, User } from 'types';
import {
  editUserRequest,
  loginRequest,
  logoutRequest,
  signupRequest
} from 'apis';

const LOGIN = 'auth/LOGIN' as const;
const SIGNUP = 'auth/SIGNUP' as const;
const LOGOUT = 'auth/LOGOUT' as const;
const EDIT_USER = 'auth/EDIT_USER' as const;

export interface State {
  readonly token: string | null;
  readonly user: ThunkAsyncState<User>;
}

const initialState: State = {
  token: null,
  user: {
    loading: false,
    data: null,
    error: null
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.user = {
          loading: true,
          data: null,
          error: null
        };
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = {
          loading: false,
          data: action.payload as User,
          error: null
        };
      })
      .addCase(login.rejected, (state, action) => {
        state.user = {
          loading: false,
          data: null,
          error: action.error as Error
        };
      })
      .addCase(signup.pending, state => {
        state.user = {
          loading: true,
          data: null,
          error: null
        };
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = {
          loading: false,
          data: action.payload as User,
          error: null
        };
      })
      .addCase(signup.rejected, (state, action) => {
        state.user = {
          loading: false,
          data: null,
          error: action.error as Error
        };
      })
      .addCase(editUser.pending, state => {
        state.user = {
          loading: true,
          data: null,
          error: null
        };
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = {
          loading: false,
          data: action.payload as User,
          error: null
        };
      })
      .addCase(editUser.rejected, (state, action) => {
        state.user = {
          loading: false,
          data: null,
          error: action.error as Error
        };
      })
      .addCase(logout.pending, state => {
        state.user = {
          loading: true,
          data: null,
          error: null
        };
      })
      .addCase(logout.fulfilled, state => {
        state.user = {
          loading: false,
          data: null,
          error: null
        };
      })
      .addCase(logout.rejected, (state, action) => {
        state.user = {
          loading: false,
          data: null,
          error: action.error as Error
        };
      })
      .addDefaultCase(state => state);
  }
});

const login = createAsyncThunk(LOGIN, async (loginInfo: LoginInfo) => {
  const user: User = await loginRequest(loginInfo);
  return user;
});

const signup = createAsyncThunk(SIGNUP, async (signupInfo: SignupInfo) => {
  const user: User = await signupRequest(signupInfo);
  return user;
});

const logout = createAsyncThunk(LOGOUT, async () => {
  await logoutRequest();
  return;
});

const editUser = createAsyncThunk(
  EDIT_USER,
  async (userInfoFormData: FormData) => {
    const user: User = await editUserRequest(userInfoFormData);
    return user;
  }
);

export const { setToken } = authSlice.actions;
export { login, signup, logout, editUser };
export default authSlice.reducer;

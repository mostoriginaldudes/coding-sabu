import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ThunkAsyncState } from '.';
import { editUserRequest, loginRequest, logoutRequest, signupRequest } from 'apis';
import { LoginInfo, SignupInfo, User } from 'types';
import AuthenticationError from 'errors/AuthenticationError';

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
          error: action.error as AuthenticationError
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

const login = createAsyncThunk(LOGIN, async (loginInfo: LoginInfo, { rejectWithValue }) => {
  try {
    const user: User = await loginRequest(loginInfo);
    return user;
  } catch (error) {
    return rejectWithValue((error as AuthenticationError).message);
  }
});

const signup = createAsyncThunk(SIGNUP, async (signupInfo: SignupInfo, { rejectWithValue }) => {
  try {
    const user: User = await signupRequest(signupInfo);
    return user;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const logout = createAsyncThunk(LOGOUT, async (_: void, { rejectWithValue }) => {
  try {
    await logoutRequest();
    return null;
  } catch (error) {
    return rejectWithValue((error as Error).message);
  }
});

const editUser = createAsyncThunk(
  EDIT_USER,
  async (userInfoFormData: FormData, { rejectWithValue }) => {
    try {
      const user: User = await editUserRequest(userInfoFormData);
      return user;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export type AuthActions =
  | typeof authSlice.actions
  | typeof login
  | typeof signup
  | typeof logout
  | typeof editUser;
export const { setToken } = authSlice.actions;
export { login, signup, logout, editUser };
export default authSlice.reducer;

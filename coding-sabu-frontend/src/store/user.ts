import { produce } from 'immer';

interface State {
  readonly email: string | null;
  readonly nickname: string | null;
  readonly position: 'teacher' | 'student' | 'admin' | null;
}

interface Action {
  readonly type: string;
  readonly payload?: any;
}

const initialState: State = {
  email: null,
  nickname: null,
  position: null
};

const FETCH_USER = 'user/FETCH_USER';

function userReducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
}

export default userReducer;

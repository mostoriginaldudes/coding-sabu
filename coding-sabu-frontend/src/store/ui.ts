import { HudStatus } from 'types';

// constants
const SET_VISIBLE_HUD = 'ui/SET_VISIBLE_HUD' as const;
const SET_INVISIBLE_HUD = 'ui/SET_INVISIBLE_HUD' as const;
const SET_HUD_STATUS_TEXT = 'ui/SET_STATUS_TEXT_HUD' as const;
const SET_VISIBLE_AUTH_FORM = 'ui/SET_VISIBLE_AUTH_FORM' as const;
const SET_INVISIBLE_AUTH_FORM = 'ui/SET_INVISIBLE_AUTH_FORM' as const;

// types
export interface State {
  readonly visibleHud: boolean;
  readonly hudStatusText: HudStatus;
  readonly visibleAuthForm: boolean;
}

type Action =
  | { type: typeof SET_VISIBLE_HUD }
  | { type: typeof SET_INVISIBLE_HUD }
  | { type: typeof SET_HUD_STATUS_TEXT; payload: HudStatus }
  | { type: typeof SET_VISIBLE_AUTH_FORM }
  | { type: typeof SET_INVISIBLE_AUTH_FORM };

// action creators
export const createActionVisibleHud = () => ({ type: SET_VISIBLE_HUD });
export const createActionInvisibleHud = () => ({ type: SET_INVISIBLE_HUD });
export const createActionStatusTextHud = (status: HudStatus) => ({
  type: SET_HUD_STATUS_TEXT,
  payload: status
});
export const createActionVisibleAuthForm = () => ({
  type: SET_VISIBLE_AUTH_FORM
});
export const createActionInvisibleAuthForm = () => ({
  type: SET_INVISIBLE_AUTH_FORM
});

// initialState
const initialState: State = {
  visibleHud: false,
  hudStatusText: 'success',
  visibleAuthForm: false
};

// reducer
function uiReducer(state = initialState, action: Action) {
  switch (action.type) {
    case SET_VISIBLE_HUD:
      return {
        ...state,
        visibleHud: true
      };
    case SET_INVISIBLE_HUD:
      return {
        ...state,
        visibleHud: false
      };
    case SET_HUD_STATUS_TEXT:
      return {
        ...state,
        hudStatusText: action.payload
      };
    case SET_VISIBLE_AUTH_FORM:
      return {
        ...state,
        visibleAuthForm: true
      };
    case SET_INVISIBLE_AUTH_FORM:
      return {
        ...state,
        visibleAuthForm: false
      };
    default:
      return state;
  }
}

export default uiReducer;

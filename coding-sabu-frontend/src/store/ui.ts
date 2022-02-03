import { HudStatus } from 'types';

// constants
const SET_VISIBLE_HUD = 'ui/SET_VISIBLE_HUD' as const;
const SET_INVISIBLE_HUD = 'ui/SET_INVISIBLE_HUD' as const;
const SET_HUD_STATUS_TEXT = 'ui/SET_STATUS_TEXT_HUD' as const;

// types
export interface State {
  readonly visibleHud: boolean;
  readonly hudStatusText: HudStatus;
}

type Action =
  | { type: typeof SET_VISIBLE_HUD }
  | { type: typeof SET_INVISIBLE_HUD }
  | { type: typeof SET_HUD_STATUS_TEXT; payload: HudStatus };

// action creators
export const createActionVisibleHud = () => ({ type: SET_VISIBLE_HUD });
export const createActionInvisibleHud = () => ({ type: SET_INVISIBLE_HUD });
export const createActionStatusTextHud = (status: HudStatus) => ({
  type: SET_HUD_STATUS_TEXT,
  payload: status
});

// initialState
const initialState: State = {
  visibleHud: false,
  hudStatusText: 'success'
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
    default:
      return state;
  }
}

export default uiReducer;

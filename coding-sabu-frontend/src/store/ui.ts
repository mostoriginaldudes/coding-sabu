import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface State {
  readonly visibleHud: boolean;
  readonly hudStatusText: string;
  readonly visibleAuthForm: boolean;
}

const initialState: State = {
  visibleHud: false,
  hudStatusText: '',
  visibleAuthForm: false
};

const uiSlicer = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showHud(state, action: PayloadAction<string>) {
      state.visibleHud = true;
      state.hudStatusText = action.payload;
    },
    hideHud(state) {
      state.visibleHud = false;
    },
    showAuthForm(state) {
      state.visibleAuthForm = true;
    },
    hideAuthForm(state) {
      state.visibleAuthForm = false;
    }
  }
});

export const { showHud, hideHud, showAuthForm, hideAuthForm } = uiSlicer.actions;
export default uiSlicer.reducer;

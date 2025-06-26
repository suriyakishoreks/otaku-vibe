import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

export interface PersistedAppContextState {
    theme: Theme;
}

const initialState: PersistedAppContextState = {
    theme: 'dark'
};

export const persistedAppContextSlice = createSlice({
    name: 'persistedAppContext',
    initialState,
    reducers: {
        updateTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload;
        }
    },
});

export const { updateTheme } = persistedAppContextSlice.actions;

export default persistedAppContextSlice.reducer;
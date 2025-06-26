import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface AppContextState {
    isHeaderNavHidden: boolean;
    isDrawerOpen: boolean;
}

const initialState: AppContextState = {
    isHeaderNavHidden: false,
    isDrawerOpen: false
};

export const appContextSlice = createSlice({
    name: 'appContext',
    initialState,
    reducers: {
        updateIsHeaderNavHidden: (state, action: PayloadAction<boolean>) => {
            state.isHeaderNavHidden = action.payload;
        },
        updateIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
            state.isDrawerOpen = action.payload;
        }
    },
});

export const { updateIsHeaderNavHidden, updateIsDrawerOpen } = appContextSlice.actions;

export default appContextSlice.reducer;
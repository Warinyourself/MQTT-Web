import { PageState, ThemeType } from "./types";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from "../..";

const initialState: PageState = {
  paletteMode: 'dark',
  direction: 'ltr',
  titlePage: 'Main page',
  spacing: 8,
  dense: false,
  paletteColors: {},
}

export const page = createSlice({
  name: 'page',
  initialState,
  reducers: {
    SET_THEME(state, action: PayloadAction<ThemeType>) {
      console.log({ newStoreTheme: action.payload })
      state.paletteMode = action.payload;
    },
    SET_TITLE_PAGE(state, action: PayloadAction<string>) {
      state.titlePage = action.payload
    },
    UPDATE_THEME(state, action: PayloadAction<Partial<PageState>>) {
      state = { ...state, ...action}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action: any) => {
      return {
        ...state,
        ...action.payload.page
      };
    })
  }
});

export const { SET_THEME, UPDATE_THEME, SET_TITLE_PAGE } = page.actions;

export const selectPaletteMode = (state: RootState) => state.page.paletteMode;
export const selectTitlePage = (state: RootState) => state.page.titlePage;
export const selectThemeData = ({ page: { paletteMode, direction, spacing, dense, paletteColors } }: RootState) => ({ paletteMode, direction, spacing, dense, paletteColors });

export const pageReducer = page.reducer;

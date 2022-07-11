export interface PageState {
  paletteMode: ThemeType,
  direction: DirectionType,
  spacing: number,
  dense: boolean,
  titlePage: string,
  paletteColors: Record<string, string>,
}

export type ThemeType = 'dark' | 'light'
export type DirectionType = 'ltr' | 'rtl'

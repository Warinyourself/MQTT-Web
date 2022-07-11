import { Theme, Palette } from '@mui/material/styles';

export const isDark = (theme: Theme) => theme.palette.mode === 'dark'
export const ifDark = (theme: Theme, arg1: any, arg2: any) => isDark(theme) ? arg1 : arg2

export const isHex = (color = '') => !!color.match(/^#[0-9a-fA-F]{3,6}$/)
export const buildColor = (color = '', theme: Theme) => isHex(color) ? color : color

export const isServer = typeof window === 'undefined'

export const typeOf = (type: string) => (object: unknown) => Object.prototype.toString.call(object) === `[object ${type}]`;


export const getKey = <T = any, O = any>(obj: T, path: string): O => {
  const keys = path.split('.');

  if (keys.length === 1) {
    return ((obj as any) || {})[keys[0]];
  }

  return getKey((obj as any)[keys[0]], keys.slice(1).join('.'));
}

export const setValue = <T = any, V = any>(obj: T, path: string, value: V) => {
  const paths = path.split('.');
  let i

  for (i = 0; i < paths.length - 1; i++) {
    obj = (obj as any)[paths[i]];
  }

  (obj as any)[paths[i]] = value;
}
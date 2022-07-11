export interface InputForm {
  name: string
  title: string
  validation: any
  type: 'text' | 'selector' | 'checkbox' | 'color'
  fieldOptions?: any
  items?: Array<{value: string}>,
  buildItemCallback?: (value: string) => JSX.Element
  value?: string
  width?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
  }
}

export interface InputsWrapper {
  children: InputType[]
  name: string
  title?: string
}

export type InputType = InputForm | InputsWrapper

export function isInputsWrapper(item: InputType): item is InputsWrapper {
  return 'children' in item;
}
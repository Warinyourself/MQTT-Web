import { TypographyTypeMap } from "@mui/material"
import { IconNames } from "../../../constant/icons"
import { MQTT_STATUS_CONNECTION } from "../../../constant/mqtt"

export type MUIColors = 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
export type TextType = TypographyTypeMap['props']['variant']
export interface ConnectionState {
  name: string
  clientId: string
  username: string
  password: string
  status: MQTT_STATUS_CONNECTION
  messages: MessageInterface[]
  fields: FieldType[]
  grid: {
    layouts: ReactGridLayout.Layouts
    status: 'block' | 'edit'
  }
}

export interface MessageInterface {
  channel_id: number
  created_at: string
  elevation: string | null
  entry_id: number
  field1: FieldNameType
  field2: FieldNameType
  field3: FieldNameType
  field4: FieldNameType
  field5: FieldNameType
  field6: FieldNameType
  field7: FieldNameType
  field8: FieldNameType
  latitude: number | null
  longitude: number | null
  status: string | null
}

export type FieldNameType = string | null

export type FieldType = FieldSliderInterface | FieldColorInterface | FieldButtonInterface | FieldIconInterface | FieldTextInterface | FieldClockInterface

export interface FieldInterface<T> extends WrapperOptions {
  // MQTT field name
  name: string
  // Controller type
  type: FieldsTypes
  // MQTT field value
  value: string
  options: T
}

export const fieldsType = ['slider', 'color', 'button', 'icon', 'text', 'clock']
export type FieldsTypes = typeof fieldsType[number]

export interface FieldSliderInterface extends FieldInterface<FieldSliderOptionsInterface> {
  type: 'slider'
}

export interface FieldButtonInterface extends FieldInterface<FieldButtonOptionsInterface> {
  type: 'button'
}

export interface FieldIconInterface extends FieldInterface<FieldIconOptionsInterface> {
  type: 'icon'
}

export interface FieldColorInterface extends FieldInterface<null> {
  type: 'color'
}

export interface FieldClockInterface {
  type: 'clock'
  id: string
  options: FieldClockOptionsInterface
  width: number
  height: number
}

export interface FieldTextInterface extends FieldInterface<FieldTextOptionsInterface> {
  type: 'text'
}

export interface FieldClockOptionsInterface {
  type?: 'default' | 'digital'
  color?: MUIColors | string
}

export interface FieldTextOptionsInterface {
  prefix?: IconNames
  postfix?: IconNames
  regex?: RegExp
  variant?: TextType
  color?: MUIColors | string
  leftIcon?: IconNames
  rightIcon?: IconNames
}

export interface FieldButtonOptionsInterface {
  leftIcon?: IconNames
  rightIcon?: IconNames
  variant?: 'text' | 'outlined' | 'contained'
  title: string
  color?: MUIColors
}

export interface FieldIconOptionsInterface {
  icon: IconNames
  variant?: 'text' | 'outlined' | 'contained'
  color?: MUIColors | string
}

export interface FieldSliderOptionsInterface {
  step?: number
  color?: MUIColors | string
  leftIcon?: IconNames
  rightIcon?: IconNames
  max?: number
  min?: number
}

export interface WrapperOptions {
  title: string
  readonly?: boolean
  width: number
  height: number
  id: string
}

export type ControllerHandler = { handleChange: (value: string) => void }
export type ControllerOptions<T extends FieldsTypes> = FieldType & { type: T } & ControllerHandler

import { ConnectionState, MessageInterface } from "./types";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "../..";
import { MQTT_STATUS_CONNECTION } from "../../../constant/mqtt";

const initialState: ConnectionState = {
  name: 'Aquarium',
  clientId: 'DDMaIhMEEAkzFQAKGAAJOxg',
  username: 'DDMaIhMEEAkzFQAKGAAJOxg',
  password: 'oePqA9qCSbOYXnVvWkf6VbJY',
  status: MQTT_STATUS_CONNECTION.close,
  messages: [],
  grid: {
    layouts: {},
    status: 'block'
  },
  fields: [
    {
      name: 'field1',
      type: 'slider',
      title: 'pump',
      value: '382',
      id: '1-slider',
      width: 3,
      height: 2,
      options: {
        min: 0,
        max: 1024,
        color: '#08D9D6',
        leftIcon: 'VolumeDown',
        rightIcon: 'VolumeUp',
      }
    },
    {
      name: 'field2',
      type: 'color',
      title: 'Hex',
      value: '#5090D3',
      id: '2-color',
      width: 4,
      height: 4,
      options: null
    },
    {
      name: 'field2',
      type: 'button',
      title: 'Hex',
      value: '#5090D3',
      id: '3-button',
      width: 2,
      height: 1,
      options: {
        leftIcon: 'BlurOn',
        title: 'Get properties'
      }
    },
    {
      name: 'field2',
      type: 'icon',
      title: 'None',
      value: '#08D9D6',
      id: '4-icon',
      width: 1,
      height: 1,
      options: {
        icon: 'BlurOn',
        color: '#08D9D6'
      }
    },
    {
      name: 'field2',
      type: 'icon',
      title: 'None',
      value: '#FF2E63',
      id: '5-icon',
      width: 1,
      height: 1,
      options: {
        icon: 'BlurOn',
        color: '#FF2E63'
      }
    },
    {
      name: 'field2',
      type: 'icon',
      title: 'None',
      value: '#30E3CA',
      id: '6-icon',
      width: 1,
      height: 1,
      options: {
        icon: 'BlurOn',
        color: '#30E3CA'
      }
    },
    {
      name: 'field1',
      type: 'text',
      title: 'None',
      value: '382',
      id: '7-text',
      width: 5,
      height: 2,
      options: {
        rightIcon: 'Bolt',
        leftIcon: 'HeatPump',
        color: '#30E3CA'
      }
    },
    {
      type: 'clock',
      id: '7-clock',
      width: 2,
      height: 2,
      options: {
        color: '#30E3CA'
      }
    },
  ]
}

export const connection = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    SET_CONNECTION_STATUS(state, action: PayloadAction<MQTT_STATUS_CONNECTION>) {
      state.status = action.payload;
    },
    ADD_MESSAGE(state, action: PayloadAction<MessageInterface>) {
      state.messages = [...state.messages, action.payload]
    },
    SET_LAYOUTS(state, action: PayloadAction<ConnectionState['grid']['layouts']>) {
      state.grid.layouts = action.payload
    },
    TOGGLE_GRID_STATUS(state) {
      state.grid.status = state.grid.status === 'block' ? 'edit' : 'block'
    },
    UPDATE_FIELD_VALUE(state, action: PayloadAction<{ field: string, value: string }>) {
      let activeFields = state.fields.filter((field) => ('name' in field) && field.name === action.payload.field)
      const ignoreFieldsValue = ['icon', 'button']

      if (activeFields.length) {
        activeFields = activeFields.map((field) => {
          if (!ignoreFieldsValue.includes(field.type) && 'value' in field) {
            field.value = action.payload.value
          }

          return field
        })
      }
    },
    ASSIGN_CONNECTION_STATE(state, action: PayloadAction<Partial<ConnectionState>>) {
      state = {...state, ...action.payload}
    },
  },
});

export const {
  ADD_MESSAGE,
  SET_LAYOUTS,
  TOGGLE_GRID_STATUS,
  UPDATE_FIELD_VALUE,
  SET_CONNECTION_STATUS,
  ASSIGN_CONNECTION_STATE,
} = connection.actions;

export const selectMQTTStatus = (state: RootState) => state.connection.status;

export const selectIsBlockLayout = (state: RootState) => state.connection.grid.status === 'block'

export const selectLayouts = (state: RootState) => state.connection.grid.layouts

export const selectConnectionName = (state: RootState) => state.connection.name;

export const messagesMQTTStatus = (state: RootState) => state.connection.messages;

export const selectFields = (state: RootState) => state.connection.fields;

export const connectionReducer = connection.reducer;

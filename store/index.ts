import { configureStore, getDefaultMiddleware, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import { pageReducer } from './reducers/page';
import { connectionReducer } from './reducers/connection';

import { combineReducers } from 'redux';
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  createMigrate,
  PersistedState,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { ConnectionState } from './reducers/connection/types';

const migrations = {
  '0': (state: PersistedState) => {
    // migration clear out fields state
    return {
      ...state,
      fields: undefined   
    }
  },
  '1': (state: PersistedState) => {
    // migration to keep all state
    return state
  }
}

const connectionPersistConfig = {
  key: 'connection',
  storage: storage,
  blacklist: ['status', 'fields'],
  version: 0, // INFO: version 0 for dev
  migrate: createMigrate(migrations, { debug: false })
}

export const reducers = combineReducers({
  page: pageReducer,
  connection: persistReducer(connectionPersistConfig, connectionReducer)
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: ['connection'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
}

export const store = makeStore();
export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const needDebug = false
export const wrapper = createWrapper<RootStore>(makeStore, { debug: needDebug });

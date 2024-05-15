import { configureStore as ConfigureStore, combineReducers } from "@reduxjs/toolkit"
import UserReducer from './Userslice'
import Otheruser from './Otheruser'
import MessageReducer from './Message'
import selectedUser from './Selecteduser'
import statusCheck from './status'
import theme from './Theme'
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

const rootreducer = combineReducers({
    user:persistReducer(persistConfig, UserReducer),
    otheruser:persistReducer(persistConfig, Otheruser),
    message:persistReducer(persistConfig, MessageReducer),
    selecteduser:persistReducer(persistConfig, selectedUser),
    status:persistReducer(persistConfig, statusCheck),
    theme:persistReducer(persistConfig, theme),
})
const store = ConfigureStore({
    reducer:rootreducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store
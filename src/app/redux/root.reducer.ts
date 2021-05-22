import { combineReducers } from 'redux';
import { overlayReducer } from './overlay/overlay';

const rootReducer = combineReducers({
  overlayReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

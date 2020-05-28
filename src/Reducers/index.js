import { combineReducers } from 'redux';
import userReducer from './userReducer';
import aptoReducer from './aptoReducer';

export default combineReducers({
    user: userReducer,
    apto: aptoReducer,
});
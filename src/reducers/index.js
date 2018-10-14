import { combineReducers } from 'redux';
import userReducer from './userReducer';
import commentReducer from './commentReducer';
import menuReducer from './menuReducer';
import { reducer as formReducer } from 'redux-form';
const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  comment: commentReducer,
  menu: menuReducer
});

export default rootReducer;

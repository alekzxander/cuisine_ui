import { combineReducers } from 'redux';
import userReducer from './userReducer';
import commentReducer from './commentReducer';
import menuReducer from './menuReducer';
import modalReducer from './modalReducer';
import cookerReducer from './cookerReducer';
import { reducer as formReducer } from 'redux-form';
const rootReducer = combineReducers({
  user: userReducer,
  form: formReducer,
  comment: commentReducer,
  menu: menuReducer,
  modal: modalReducer,
  cooker: cookerReducer
});

export default rootReducer;

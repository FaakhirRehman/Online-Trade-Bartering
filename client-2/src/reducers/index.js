import categoryReducer from './category.reducers';
import productReducer from './product.reducers';
import imageReducer from './Images.reducer';
import authReducer from './auth.reducers';
import cartReducer from './cart.reducers';
import userReducer from './user.reducers';
import { combineReducers } from 'redux';
import ReconmReducer from './reconmendation.reducer';

const model = (state = false, action) => {
  switch (action.type) {
    case 'LOGIN_MODEL':
      return !state;
    default:
      return state;
  }
};
const rootReducer = combineReducers({
  category: categoryReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  user: userReducer,
  loginModel: model,
});

export default rootReducer;

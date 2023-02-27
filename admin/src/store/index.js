import { applyMiddleware, createStore } from 'redux';
import rootRender from '../reducers';
import thunk from 'redux-thunk';

const store = createStore(rootRender, applyMiddleware(thunk));

export default store;
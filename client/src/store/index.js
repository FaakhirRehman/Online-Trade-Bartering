import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootRender from '../reducers';
import thunk from 'redux-thunk';

const store = createStore(rootRender, applyMiddleware(thunk));

export default store;
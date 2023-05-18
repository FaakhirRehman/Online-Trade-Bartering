import { applyMiddleware, createStore } from 'redux';
import rootRender from '../reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

const store = createStore(rootRender, composeWithDevTools(
    applyMiddleware(thunk)
));

export default store;


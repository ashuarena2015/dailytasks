import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const middlewareArray = [thunk];
const composeEnhancers =	typeof window === 'object'
	&& window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
	? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
	: compose;

const enhancer = composeEnhancers(
	applyMiddleware(...middlewareArray)
);

const configureStore = () => {
	return createStore(reducers, enhancer);
};

export default configureStore;

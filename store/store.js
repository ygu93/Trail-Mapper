import {createStore} from 'redux';
import RootMiddleware from '../middleware/root_middleware.js';
import RootReducer from '../reducers/root_reducer.js';



const configureStore = (preloadedState = {}) => (
    createStore(RootReducer, preloadedState, RootMiddleware)
);

export default configureStore;

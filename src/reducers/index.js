import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import relations from './relations';

const createRootReducer = (history) => combineReducers({
    router: connectRouter(history),
    relations
});

export default createRootReducer;

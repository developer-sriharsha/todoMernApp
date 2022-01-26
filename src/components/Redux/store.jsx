import {createStore,applyMiddleware} from 'redux'
import rootReducer from './root-reducer'
import thunk from 'redux-thunk';

const middleWares=[thunk]

const store=createStore(rootReducer,applyMiddleware(...middleWares))

export default store;
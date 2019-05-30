import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Homeposts} from './homeposts';
import {Ratings} from './ratings';
import {Promotions} from './promotions';
import {Booking} from './booking';
import {Auth} from './auth';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            homeposts: Homeposts,
            ratings: Ratings,
            promotions: Promotions,
            auth: Auth,
            booking: Booking
        }),
        // applyMiddleware(thunk, logger)
        applyMiddleware(thunk)
    );

    return store;
}

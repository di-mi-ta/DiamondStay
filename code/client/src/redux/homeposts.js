import * as ActionTypes from './ActionTypes';
import HOMEPOST from '../shared/homeposts';

export const Homeposts = (state = {
        isLoading: true,
        errMess: null,
        homeposts: HOMEPOST
    }, action) => {
    switch(action.type) {
        // case ActionTypes.ADD_HOMEPOSTS:
        //     return {...state, isLoading: false, errMess: null, homeposts: action.payload};

        // case ActionTypes.HOMEPOSTS_LOADING:
        //     return {...state, isLoading: true, errMess: null, homeposts: []};

        // case ActionTypes.HOMEPOSTS_FAILED:
        //     return {...state, isLoading: false, errMess: action.payload, homeposts: []};

        default:
            return state;
    }
}
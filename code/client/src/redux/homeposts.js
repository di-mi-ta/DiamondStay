import * as ActionTypes from './ActionTypes';
import HOMEPOST from '../shared/homeposts';

export const Homeposts = (state = {
        isLoading: true,
        errMess: null,
        homeposts: [],
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_HOMEPOSTS:
            return {...state, homeposts: action.payload}
        
        case ActionTypes.ADD_HOMEPOST:
            return {...state, isLoading: false, errMess: null, homeposts: action.payload};

        case ActionTypes.HOMEPOSTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, homeposts: []};

        case ActionTypes.UPDATE_HOMEPOST:
            let idx1 = state.homeposts.findIndex(homepost => homepost._id === action.payload._id)
            state.homeposts[idx1] = action.payload;
            return {...state, homeposts: state.homeposts}

        default:
            return state;
    }
}
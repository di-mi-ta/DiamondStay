import * as ActionTypes from './ActionTypes';
import HOMEPOST from '../shared/homeposts';

export const Homeposts = (state = {
        isLoading: true,
        errMess: null,
        homeposts: HOMEPOST,
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_HOMEPOSTS:
            state.homeposts.push(action.payload)
            return {...state, homeposts: state.homeposts}
        
        case ActionTypes.ADD_HOMEPOST:
            return {...state, isLoading: false, errMess: null, homeposts: action.payload};

        case ActionTypes.HOMEPOSTS_LOADING:
            return {...state, isLoading: true, errMess: null, homeposts: []};

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
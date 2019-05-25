import * as ActionTypes from './ActionTypes';
import HOMEPOST from '../shared/homeposts';

export const Homeposts = (state = {
        isLoading: true,
        errMess: null,
<<<<<<< HEAD
        homeposts: [],
        currentHomepost: null
=======
        homeposts: HOMEPOST,
>>>>>>> tan-branch
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_HOMEPOST:
            state.homeposts.push(action.payload)
            return {...state, homeposts: state.homeposts}
        
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
<<<<<<< HEAD
            
        case ActionTypes.UPDATE_CURRENT_HOMEPOST:
            return {...state, currentHomepost: action.payload}
=======

>>>>>>> tan-branch
        default:
            return state;
    }
}
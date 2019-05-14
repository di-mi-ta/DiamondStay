import * as ActionTypes from './ActionTypes';
import PROMOTIONS from '../shared/promotions';

export const Promotions = (state={
        isLoading: true,
        errMess: null,
        promotions: PROMOTIONS
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_HOST_PROMO:
            state.promotions.push(action.payload)
            return {...state, promotions: state.promotions}
        case ActionTypes.DELETE_HOST_PROMO:
            let newLstPromos = state.promotions.filter((promo => promo._id !== action.payload._id))
            state.promotions = newLstPromos
            return {...state, promotions: state.promotions}
        case ActionTypes.ADD_HOST_PROMOS:
            return {...state, isLoading: false, errMess: null, promotions: action.payload};
        case ActionTypes.HOST_PROMOS_LOADING:
            return {...state, isLoading: true, errMess: null, promotions: []};
        case ActionTypes.UPDATE_HOST_PROMO:
            let idx = state.promotions.findIndex(promo => promo._id === action.payload._id)
            state.promotions[idx] = action.payload;
            return {...state, promotions: state.promotions}
        default:
            return state
    }
}

// export const Promotions = (state = {
//         isLoading: true,
//         errMess: null,
//         promotions: []
//     }, action) => {
//     switch(action.type) {
//         case ActionTypes.ADD_PROMOS:
//             return {...state, isLoading: false, errMess: null, promotions: action.payload};

//         case ActionTypes.PROMOS_LOADING:
//             return {...state, isLoading: true, errMess: null, promotions: []};

//         case ActionTypes.PROMOS_FAILED:
//             return {...state, isLoading: false, errMess: action.payload, promotions: []};

//         default:
//             return state;
//     }
// }

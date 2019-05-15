import * as ActionTypes from './ActionTypes';

export const Promotions = (state={
        isLoading: true,
        errMess: null,
        hostPromotions: [],
        systemPromos: [],
    }, action) => {
    switch(action.type){
        case ActionTypes.ADD_HOST_PROMO:
            state.hostPromotions.push(action.payload)
            return {...state, hostPromotions: state.hostPromotions}
        case ActionTypes.DELETE_HOST_PROMO:
            let newLstPromos = state.hostPromotions.filter((promo => promo._id !== action.payload._id))
            state.hostPromotions = newLstPromos
            return {...state, hostPromotions: state.hostPromotions}
        case ActionTypes.ADD_HOST_PROMOS:
            return {...state, isLoading: false, errMess: null, hostPromotions: action.payload};
        case ActionTypes.HOST_PROMOS_LOADING:
            return {...state, isLoading: true, errMess: null, hostPromotions: []};
        case ActionTypes.UPDATE_HOST_PROMO:
            let idx = state.hostPromotions.findIndex(promo => promo._id === action.payload._id)
            state.hostPromotions[idx] = action.payload;
            return {...state, hostPromotions: state.hostPromotions}
        
        case ActionTypes.ADD_SYSTEM_PROMO:
            state.systemPromos.push(action.payload)
            return {...state, systemPromos: state.systemPromos}
        case ActionTypes.DELETE_SYSTEM_PROMO:
            let newLstSysPromos = state.systemPromos.filter((promo => promo._id !== action.payload._id))
            state.systemPromos = newLstSysPromos
            return {...state, systemPromos: state.systemPromos}
        case ActionTypes.ADD_SYSTEM_PROMOS:
            return {...state, isLoading: false, errMess: null, systemPromos: action.payload};
        case ActionTypes.SYSTEM_PROMOS_LOADING:
            return {...state, isLoading: true, errMess: null, systemPromos: []};
        case ActionTypes.UPDATE_SYSTEM_PROMO:
            let idx1 = state.systemPromos.findIndex(promo => promo._id === action.payload._id)
            state.systemPromos[idx1] = action.payload;
            return {...state, systemPromos: state.systemPromos}
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

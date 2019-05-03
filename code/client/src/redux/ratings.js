import * as ActionTypes from './ActionTypes';

export const Ratings = (state = {
        errMess: null,
        ratings: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_RATINGS:
            return {...state, isLoading: false, errMess: null, ratings: action.payload};

        case ActionTypes.RATINGS_FAILED:
            return {...state, isLoading: false, errMess: action.payload, ratings: []};

        case ActionTypes.ADD_RATING:
            var rating = action.payload;
            return {...state, ratings: state.ratings.concat(rating)};
        default:
            return state;
    }
}
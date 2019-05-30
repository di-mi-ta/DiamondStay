import * as ActionTypes from './ActionTypes';

export const Booking = (state = {
        isLoading: true,
        errMess: null,
        lstBookings: []
    }, action) => {
    switch(action.type) {
        case ActionTypes.ADD_BOOKINGS:
            return {...state, isLoading: false, errMess: null, lstBookings: action.payload}

        case ActionTypes.ADD_BOOKING:
            state.lstBookings.push(action.payload)
            return {...state, isLoading: false, errMess: null, lstBookings: state.lstBookings}

        default:
            return state;
    }
}

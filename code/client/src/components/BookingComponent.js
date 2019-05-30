import React, { Component } from 'react';
import BookingForm from './Booking/BookingForm';
import MainHeader from './HomePage/MainHeader';

class Booking extends Component{

    render(){
        return(
            <div>
                <MainHeader/>
                <BookingForm/>
            </div>
        );
    }
}

export default Booking;
import BookingForm from '../Booking/BookingForm';
import MainHeader from '../HomePage/MainHeader';
import React from 'react';

class NewBookingPage extends React.Component{
    render(){
        return (
            <React.Fragment>
                <MainHeader />
                <BookingForm />
            </React.Fragment>
        )
    }
}

export default NewBookingPage;

import BookingForm from './Booking/BookingForm';
import MainHeader from './HomePage/MainHeader';
import React from 'react';

class Booking extends React.Component{
    render(){
        return (
            <div>
                <MainHeader 
                    auth={this.props.auth} 
                    loginUser={this.props.loginUser} 
                    logoutUser={this.props.logoutUser}
                    promotions={this.props.promotions}
                    homeposts={this.props.homeposts}
                    fetchSystemPromos={this.props.fetchSystemPromos}
                    fetchHomeposts = {this.props.fetchHomeposts}
                />
                <BookingForm
                    auth={this.props.auth} 
                    loginUser={this.props.loginUser} 
                    logoutUser={this.props.logoutUser}
                    promotions={this.props.promotions}
                    homeposts={this.props.homeposts}
                    fetchSystemPromos={this.props.fetchSystemPromos}
                    fetchHomeposts = {this.props.fetchHomeposts}
                />
            </div>
        )
    }
}

export default Booking;
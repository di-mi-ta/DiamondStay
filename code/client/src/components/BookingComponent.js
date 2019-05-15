import React, { Component } from 'react';
import "../css/booking.css";
class Booking extends Component {
    render() {
        return(
            <div class="super-form">
                <div class="background_image" ><img src="images/booking.jpg"/></div>
                <div class="bg-agile">
                    <div class="book-appointment">
                        <h2>Booking Now</h2>
                        <div class="book-form agileits-login">
                            <form action="#" method="post">
                                <div class="agileits_reservation_grid">
                                    <div class="phone_email">
                                        <div class="form-text">
                                            <i class="fa fa-user" aria-hidden="true"></i>
                                            <input type="text" name="Name" placeholder="First name" required=""/>
                                        </div> 
                                    </div>
                                    <div class="phone_email phone_email1">
                                        <div class="form-text">
                                            <i class="fa fa-user" aria-hidden="true"></i>
                                            <input type="text" name="Name" placeholder="Last name" required=""/>
                                        </div>
                                    </div>
                                    <div class="phone_email">
                                        <div class="form-text">
                                            <i class="fa fa-phone" aria-hidden="true"></i>
                                            <input type="text" name="Phone no" placeholder="Phone number" required=""/>
                                        </div> 
                                    </div> 
                                    <div class="phone_email phone_email1">
                                        <div class="form-text">
                                            <i class="fa fa-envelope-o" aria-hidden="true"></i>
                                            <input type="email" name="email" placeholder="Email" required=""/>
                                        </div>
                                    </div>
                                    <div class="span1_of_1 phone_email1">
                                        <div class="book_date"> 
                                            <i class="fa fa-calendar" aria-hidden="true"></i>
                                            <input  id="datepicker" name="Text" type="text" value="" placeholder="Arrival Date"  onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'mm/dd/yyyy';}" required=""/>
                                        </div>					
                                    </div>
                                    <div class="span1_of_1 phone_email">
                                        <div class="book_date"> 
                                            <i class="fa fa-calendar" aria-hidden="true"></i>
                                            <input  id="datepicker1" name="Text" type="text" value="" placeholder="Departure Date"  onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'mm/dd/yyyy';}" required=""/>
                                        </div>					
                                    </div>
                                    <div class="span1_of_1">
                                        <div class="section_room">
                                            <i class="fa fa-users" aria-hidden="true"></i>
                                            <select id="country" onchange="change_country(this.value)" class="frm-field required">
                                                <option value="">No.of guests</option>
                                                <option value="">1</option>
                                                <option value="">2 </option>         
                                                <option value="">3</option>
                                                <option value="">4 </option>
                                                <option value="">5 </option>
                                                <option value="">6 </option>
                                            </select>
                                        </div>	
                                    </div>
                                    <div class="span1_of_1 phone_email1">
                                        <div class="section_room">
                                            <i class="fa fa-h-square" aria-hidden="true"></i>
                                            <select id="country1" onchange="change_country(this.value)" class="frm-field required">
                                                <option value="">Room Type</option>
                                                <option value="">Single Room</option>
                                                <option value="">Double Room </option>         
                                                <option value="">Suit Room</option>
                                            </select>
                                        </div>	
                                    </div>
                                    <div class="clear"></div>
                                </div> 
                                <input type="submit" value="Book Now"/>
                                <div class="clear"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Booking;
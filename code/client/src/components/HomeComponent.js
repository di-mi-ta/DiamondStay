import React, { Component } from 'react';
import "../css/main_styles.css";

class Home extends Component{
    render(){
        return(
            <div class="home">
                <div class="background_image" ><img src="images/intro.jpg"/></div>
                <div class="home_container">
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <div class="home_content text-center">
                                    <div class="home_title">DiamondStay</div>
                                    <div class="home_subtitle">Hello..., it's me.</div>
                                    <div class="booking_form_container">
                                        <form action="#" class="booking_form">
                                            <div class="d-flex flex-xl-row flex-column align-items-start justify-content-start">
                                                <div class="booking_input_container d-flex flex-lg-row flex-column align-items-start justify-content-start">
                                                    <div><input type="text" class="datepicker booking_input booking_input_a booking_in" placeholder="Ngày Check in" required="required"/></div>
                                                    <div><input type="text" class="datepicker booking_input booking_input_a booking_out" placeholder="Ngày Check out" required="required"/></div>
                                                    <div><input type="text" class="search_input booking_input_b" placeholder="Tìm kiếm phòng trọ..." required="required"/></div>
                                                </div>
                                                <div><button class="booking_button trans_200">Book Now</button></div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="booking_form_container">
                                <form action="#" class="booking_form">
                                    <div class="d-flex flex-xl-row flex-column align-items-start justify-content-start">
                                        <div class="booking_input_container d-flex flex-lg-row flex-column align-items-start justify-content-start">
                                            <div><input type="number" class="booking_input booking_input_b" placeholder="Người lớn" required="required"/></div>
                                            <div><input type="number" class="booking_input booking_input_b" placeholder="Trẻ em" required="required"/></div>
                                            <div><input type="number" class="booking_input booking_input_b" placeholder="Số phòng" required="required"/></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        );
    }
}

export default Home;
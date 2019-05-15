import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Header from "./HeaderComponent";
import Home from "./HomeComponent"; //Khoa
import "../css/main_styles.css";
class Result extends Component{
    render(){
        return(
            <div class="details">
                <div><br/></div>
		        <div class="container">
			        <div class="row">
				        <div class="col-xl-7 col-lg-6">
					        <div class="details_image">
						        <div class="background_image" style={{backgroundImage: `url("images/details_1.jpg")`}}></div>
					        </div>
				        </div>
				    <div class="col-xl-5 col-lg-6">
					    <div class="details_content">
						    <div class="details_title">Family Room</div>
						        <div class="details_list">
                                    <ul>
                                        <li>27 m² Patio</li>
                                        <li>Balcony with view</li>
                                        <li>Garden / Mountain view</li>
                                        <li>Flat-screen TV</li>
                                        <li>Air conditioning</li>
                                        <li>Soundproofing</li>
                                        <li>Private bathroom</li>
                                        <li>Free WiFi</li>
                                    </ul>
						        </div>
						        <div class="details_long_list">
                                    <ul class="d-flex flex-row align-items-start justify-content-start flex-wrap">
                                        <li>Balcony</li>
                                        <li>Mountain view</li>
                                        <li>Terrace</li>
                                        <li>TV</li>
                                        <li>Satellite Channels</li>
                                        <li>Safety Deposit Box</li>
                                        <li>Heating</li>
                                        <li>Sofa</li>
                                        <li>Tile/Marble floor</li>
                                        <li>Mosquito net</li>
                                        <li>Wardrobe/Closet</li>
                                        <li>Sofa bed</li>
                                        <li>Shower</li>
                                        <li>Hairdryer</li>
                                        <li>Free toiletries</li>
                                        <li>Toilet</li>
                                        <li>Bath or Shower</li>
                                        <li>Toilet paper</li>
                                        <li>Tea/Coffee Maker</li>
                                        <li>Minibar</li>
                                        <li>Dining area</li>
                                        <li>Electric kettle</li>
                                        <li>Dining table</li>
                                        <li>Outdoor furniture</li>
                                        <li>Outdoor dining area</li>
                                        <li>Towels</li>
                                        <li>Linen</li>
                                        <li>Upper floors accessible by lift</li>
                                    </ul>
						        </div>
						        <div class="book_now_button"><a href="#">Book Now</a></div>
					        </div>
				        </div>
			        </div>
		        </div>
	        </div>
        );
    }
}

export default Result;
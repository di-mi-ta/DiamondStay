import React from 'react';
import { Link } from 'react-router-dom';
import "../css/main_styles.css";

function Footer(props) {
    return(
        <footer class="footer">
		    <div class="footer_content">
			    <div class="container">
				    <div class="row">
					    <div class="col">
						    <div class="footer_logo_container text-center">
							    <div class="footer_logo">
								    <a href="#"></a>
								    <div>DStay</div>
								    <div>since 2019</div>
							    </div>
						    </div>
					    </div>
				    </div>
                    <div class="row footer_row">
                        <div class="col-lg-3">
                            <div class="footer_title">Địa chỉ của chúng tôi</div>
                            <div class="footer_list">
                                <ul>
                                    <li>999 đường Khởi Nghiệp</li>
                                    <li>Phường Rose, Quận Vũ.</li>
                                    <li>Việt Nam</li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-lg-3">
                            <div class="footer_title">Tiếp tâns</div>
                            <div class="footer_list">
                                <ul>
                                    <li>Tel: 345 5667 889</li>
                                    <li>Fax; 6783 4567 889</li>
                                    <li>reservations@hotelriver.com</li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-lg-3">
                            <div class="footer_title">Newsletter</div>
                            <div class="newsletter_container">
                                <form action="#" class="newsletter_form" id="newsletter_form">
                                    <input type="email" class="newsletter_input" placeholder="Địa chỉ email" required="required"/>
                                    <button class="newsletter_button">Subscribe</button>
                                </form>
                            </div>
                        </div>

                        <div class="col-lg-3">
                            <div class="certificates d-flex flex-row align-items-start justify-content-lg-between justify-content-start flex-lg-nowrap flex-wrap">
                                <div class="cert"><img src="images/cert_1.png" alt=""/></div>
                                <div class="cert"><img src="images/cert_2.png" alt=""/></div>
                            </div>
                        </div>
                    </div>
			    </div>
		    </div>
        </footer>
    );
}

export default Footer;
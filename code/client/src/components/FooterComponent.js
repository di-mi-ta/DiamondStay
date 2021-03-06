
import React from 'react';
import '../css/footer.css';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';

function Footer(props) {
    return(
        <div className="footer">
            <div className="container footer-container">
                <div className="row justify-content-center">
                    <div className="col-xs-12 col-md-4">
                        <img src="../assets/images/diamond.ico" alt=""/>
                        <h2 className="mb-0">Diamond Stay</h2>
                        <p>Hệ thống chia sẻ nhà</p>
                    </div>           
                    <div className="col-xs-12 col-md-4">
                        <h5>Visit</h5>
                        <address>
                            268 Ly Thuong Kiet St.<br />
                            District 10, TP.HCM<br />
                            Socialist Republic of Vietnam<br />
                        </address>
                        <br />
                        <h5>Business</h5>
                        <address>
                            +84 39 251 6548<br />
                            Diamond Stay<br />
                        </address>
                    </div>
                    <div className="col-xs-12 col-md-4 align-self-center social-icons-container">
                        <h5>Follow Us</h5>
                        <div>
                            <SocialIcon url="https://www.google.com" fgColor="#ffffff"/>
                            <SocialIcon url="https://www.facebook.com/" fgColor="#ffffff"/>
                            <SocialIcon url="https://www.twitter.com/" fgColor="#ffffff"/>
                            <SocialIcon url="https://linkedin.com/" fgColor="#ffffff"/>
                            <SocialIcon url="https://www.cse.hcmut.edu.vn" label="CSE" fgColor="#ffffff"/>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">             
                    <div className="col-auto">
                        <p className="mb-0">© Copyright @2019 Diamond Stay. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
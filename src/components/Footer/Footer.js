import React from 'react'
import {BadgeOutlined, CarRentalOutlined, LocalOfferOutlined, CompareOutlined} from '@mui/icons-material'
import './Footer.scss'

export default function Footer() {
    return (
        <div className="footer">
            {/*  */}
            <div className="footer-main">
                <div className="footer-main-overview">
                    <div className="footer-main-overview-title">
                        <span>OVERVIEW</span>
                    </div>
                    <div className="footer-main-overview-items">
                        <div>About us</div>
                        <div>FAQs</div>
                        <div>Privacy Policy</div>
                        <div>Terms & Conditions</div>
                        <div>Corporate Policies</div>
                    </div>
                </div>
                <div className="footer-main-others">
                    <div className="footer-main-others-title">
                        <span>OTHERS</span>
                    </div>
                    <div className="footer-main-others-items">
                        <div>Advertise with Us</div>
                        <div>Careers</div>
                        <div>Customer Care</div>
                    </div>
                </div>
                <div className="footer-main-connect">
                    <div className="footer-main-connect-title">
                        <span>CONNECT WITH US</span>
                    </div>
                    <div className="footer-main-connect-items">
                        <div>0000 000 0000 (Toll-Free)</div>
                        <div>support@carzone.com</div>
                        <div>Dealer solutions</div>
                        <div>Used Cars Business</div>
                        <div>Contact Us</div>
                        <div>Feedback</div>
                    </div>
                </div>
            </div>
            {/*  */}
        </div>
    )
}

import React from 'react'
import './CarItem.scss'

export default function CarItem({title, price, image, available}) {
    return (
        <div className="caritem">
            <div className="caritem-container">
                <div className="caritem-image">
                    <img src={image} alt=""/>
                </div>
                <div className="caritem-title">
                    <span>{title}</span>
                </div>
                <div className="caritem-price">
                    <span>{price}</span>
                </div>
                {available===undefined?
                <div className="caritem-offers">
                    <button>Check September Offers</button>
                </div>:
                <div className="caritem-available">
                    <span>{available}</span>
                </div>}
            </div>
        </div>
    )
}

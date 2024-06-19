import React from 'react'
import './NewTechDetails.scss'

export default function NewTechDetails({title, points, description, image}) {
    return (
        <div className="newtech-details">
            <div className="newtech-details-container">
                <div className="newtech-details-left">
                    <div className="newtech-details-left-title">
                        <span>{title}</span>
                    </div>

                    {points!==null?
                    <div className="newtech-details-left-points">
                        {points.map((item)=>(
                            <div>{item}</div>
                        ))}
                    </div>:null}

                    {description!==null?
                    <div className="newtech-details-left-description">
                        <span>{description}</span>
                    </div>:null}

                    <div className="newtech-details-left-button">
                        <div>
                            <button>Know More</button>
                        </div>
                        <div>
                            <img src="https://stimg.cardekho.com/images/uploadimages/1631678830268/logo.png" alt=""/>
                        </div>
                    </div>
                </div>

                <div className="newtech-details-right">
                    <img src={image} alt=""/>
                </div>
            </div>
        </div>
    )
}

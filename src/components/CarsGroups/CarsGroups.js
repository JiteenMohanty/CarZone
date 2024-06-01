import React from 'react'
import CarItem from './CarItem/CarItem'
import './CarsGroups.scss'

export default function CarsGroups({title, data}) {
    return (
        <div className="car-groups">
            <div className="car-groups-container">
                <div className="car-groups-header">
                    <div className="car-groups-header-title">
                        <span>{title}</span>
                    </div>
                    {data['normal']===undefined?
                    <div className="car-groups-header-nav-components">
                        {Object.keys(data).map(item=>(<button>{item}</button>))}
                    </div>:null}
                </div>
                <div className="car-groups-items">
                    {data['normal']===undefined?
                    data[Object.keys(data)[0]].map(item=>(
                    <div>
                        <CarItem {...item}/>
                    </div>
                    )):
                    data['normal'].map(item=>(
                    <div>
                        <CarItem {...item}/>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

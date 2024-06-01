import React from 'react'
import { ArrowRight } from '@mui/icons-material'
import './NewTechItem.scss'

export default function NewTechItem({name, showing, ...props}) {
    return (
        <div className="newtechitem-container"
             onClick={()=>props.clicked(name)}
             style={showing? null: {borderRight:"1px solid #ccc"}}>
            <div>
                <span>{name}</span>
            </div>
            <div>
                {showing?<ArrowRight/>:null}
            </div>
        </div>
    )
}

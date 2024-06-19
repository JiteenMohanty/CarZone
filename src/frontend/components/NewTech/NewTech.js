import React, { useState } from 'react'
import NewTechItem from './NewTechItem/NewTechItem'

import './NewTech.scss'
import NewTechDetails from './NewTechDetails/NewTechDetails'

export default function NewTech() {
    const [itemDetails, setItemDetails] = useState({
        "title":'It’s an experience unlike before',
        'points': ["- Man. Machine. And AI.", "- MG Astor. The AI Affair."],
        "description": null,
        "image": 'https://stimg.cardekho.com/images/uploadimages/1631682085424/1.gif'
    })
    const itemClickHandler = (name) =>{
        switch(name){
            case "MG Astor":
                setItemDetails({
                    "title":'It’s an experience unlike before',
                    'points': ["- Man. Machine. And AI.", "- MG Astor. The AI Affair."],
                    "description":null,
                    "image": 'https://stimg.cardekho.com/images/uploadimages/1631682085424/1.gif'
                })
                break;
            case "AI Assistant":
                setItemDetails({
                    "title":'India’s first car with Personal AI Assistant.',
                    'points': ["- Attentive","- Wingman","- Know-it-all"],
                    "description":null,
                    "image": 'https://stimg.cardekho.com/images/uploadimages/1631682085452/2.gif'
                })
                break;
            case "Advanced Driver Assistant System":
                setItemDetails({
                    "title":'Introducing Astor Autonomous Level 2 ADAS',
                    'points': null,
                    "description":"Advanced Driver Assistant System is a group of safety and convenience functions intended to improve comfort for drivers and road safety, and preventing or reducing the severity of potential accidents.",
                    "image": 'https://stimg.cardekho.com/images/uploadimages/1631682085623/3.gif'
                })
                break;
            case "Autonomous Level 2 Features":
                setItemDetails({
                    "title":'First-In-Segment Level 2 Features',
                    'points': ["- Lane Functions", "- Speed Assist System", "- Forward Collision Prevention"],
                    "description": null,
                    "image": 'https://stimg.cardekho.com/images/uploadimages/1631682085744/4.gif'
                })
                break;
            case "i-Smart Hub":
                setItemDetails({
                    "title":'i-Smart Hub',
                    'points': null,
                    "description": "A platform of endless possibilities",
                    "image": 'https://stimg.cardekho.com/images/uploadimages/1631682085798/5.gif'
                })
                break;
            default:
                return
        }
    }
    return (
    <div className="newtech">
        <div className='newtech-container'>
            <div className="newtech-options">
                <NewTechItem name="MG Astor" 
                             clicked={(name)=>itemClickHandler(name)}
                             showing={itemDetails.title==="It’s an experience unlike before"}/>
                <NewTechItem name="AI Assistant" 
                             clicked={(name)=>itemClickHandler(name)}
                             showing={itemDetails.title==="India’s first car with Personal AI Assistant."}/>
                <NewTechItem name="Advanced Driver Assistant System" 
                             clicked={(name)=>itemClickHandler(name)}
                             showing={itemDetails.title==="Introducing Astor Autonomous Level 2 ADAS"}/>
                <NewTechItem name="Autonomous Level 2 Features" 
                             clicked={(name)=>itemClickHandler(name)}
                             showing={itemDetails.title==="First-In-Segment Level 2 Features"}/>
                <NewTechItem name="i-Smart Hub" 
                             clicked={(name)=>itemClickHandler(name)}
                             showing={itemDetails.title==="i-Smart Hub"}/>
            </div>
            <div className="newtech-details">
                <NewTechDetails {...itemDetails}/>
            </div>
        </div>
    </div>
    )
}

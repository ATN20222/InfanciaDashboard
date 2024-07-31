import React, { useState } from "react";


const ParentRequestItem = ({PublisherImage , PublisherName, PublishDate , Text , IsPopUp })=>{

    
    return(
        <div className={`ParentRequestItem ${IsPopUp?"ParentRequestItemPopUp":""}`}>
             
            
            <div className="row">
                <div className="col-lg-12 PostHeader">
                    <div className="PostTopLeft">
                        <div className="PublisherImageContainer" >
                            <img src={PublisherImage} alt={PublisherName} />
                        </div>
                        <div className="PublisherNameAndDate">
                            <h6 className="PublisherName">{PublisherName}</h6>
                            <span className="PublishDate">{PublishDate}</span>
                        </div>
                    </div>
                    


                </div>
                <div className="col-lg-12 NewletterItemCol">
                    <span>{Text}</span>
                </div>
                
               
            </div>
        </div>

    );
}

export default ParentRequestItem;

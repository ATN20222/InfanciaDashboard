import React, { useState } from "react";


const ClosedRequestItem = ({PublisherImage , PublisherName, PublishDate , Text , IsPopUp ,ReplierImage ,ReplierName, ReplierDate , ReplierText  })=>{

    
    return(
        <div className="ClosedRequestItemContainer">
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


            <div className={`ParentRequestItem ParentRequestItemReplied ${IsPopUp?"ParentRequestItemPopUp":""}`}>
                
                
                <div className="row">
                    <div className="col-lg-12 PostHeader">
                        <div className="PostTopLeft ReplierHeader" dir="rtl">
                            <div className="PublisherImageContainer" >
                                <img src={ReplierImage} alt={ReplierName} />
                            </div>
                            <div className="PublisherNameAndDate">
                                <h6 className="PublisherName">{ReplierName}</h6>
                                <span className="PublishDate">{ReplierDate}</span>
                            </div>
                        </div>
                        
    
    
                    </div>
                    <div className="col-lg-12 NewletterItemCol">
                        <span>{ReplierText}</span>
                    </div>
                    
                    
                </div>
            </div>


        </div>
        

    );
}

export default ClosedRequestItem;

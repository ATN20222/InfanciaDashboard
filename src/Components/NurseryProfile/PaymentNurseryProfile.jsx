import React, { useState } from "react";

const PaymentNurseryProfile = () => {
    const tableData = [
        { id: 1, name: "Ahmed hamed", paymentId: 201, amount: "20$", class:"Class A", date: "20-8-2024" , service:"Travel"},
        { id: 2, name: "Ahmed hamed", paymentId: 204, amount: "100$", class:"Class B", date: "20-8-2024" , service:"Travel"},
        { id: 2, name: "Ahmed hamed", paymentId: 204, amount: "250$", class:"Class B", date: "20-8-2024" , service:"Travel"},
    ];

  return (
    <div className="PaymentNurseryProfile">
        <div className="NurseryContainer NurseryGallery PaymentNurseryItem">
            
            <div className="AddGallery">
            <span>Subscribtion</span>
            </div>

            
            <div className="GalleryContainer SubscriptionContainer">
                <div className="col-lg-12 SubscribtionHeader">
                    <span>Your Subscribtion Plan</span>
                </div>
                <div className="col-lg-12 SubscriptionItem">
                    <div className="Title">

                        <span>Subscription</span>
                    </div>
                    <div className="Data">
                        <span>Siver Packege</span>

                    </div>
                    
                </div>
                <div className="col-lg-12 SubscriptionItem">
                    <div className="Title">

                        <span>Price</span>
                    </div>
                    <div className="Data">
                        <span>1000$</span>

                    </div>
                    
                </div>
                <div className="col-lg-12 SubscriptionItem">
                    <div className="Title">

                        <span>Next Builling Date</span>
                    </div>
                    <div className="Data">
                        <span>April 23,2024</span>

                    </div>
                    
                </div>
            </div>
        
        </div>
        <div className="NurseryContainer NurseryGallery PaymentNurseryItem">
            
            <div className="AddGallery">
            <span>Payment History</span>
            </div>

            
            <div className="GalleryContainer NuseryPaymentHistory ">
            {tableData.map((row) => (
                <div className="col-lg-12 RecordEmpTable">
                    <div className="row">
                        
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6 Center">
                            <span className="BranchTableSpan" data-content={row.date}>

                                {row.date}
                            </span>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6 Center">
                            <span className="BranchTableSpan" data-content={row.amount}>

                                {row.amount}
                            </span>
                        </div>
                        
                            
                    </div>
                
                </div>
            ))}
            
            </div>
        </div>
    </div>

  );
};

export default PaymentNurseryProfile;

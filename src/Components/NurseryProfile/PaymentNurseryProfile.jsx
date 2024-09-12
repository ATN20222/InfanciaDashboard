import React, { useEffect, useState } from "react";
import { NurseryProfileService } from "../../Service/Api";
import toast from "react-hot-toast";

const PaymentNurseryProfile = () => {
    const [amount, setAmount] = useState(0);
    const [createdAt, setCreatedAt] = useState(null);
    const [intialPayment, setIntialPayment] = useState('');
    const [nextPayment, setNextPayment] = useState('');
    const [nurseryId, setNurseryId] = useState(null);
    const [packageName, setPackageName] = useState('');
    const [history , setHistory] = useState([]);
    useEffect(()=>{
        GetData();
    },[]);
    async function GetData() {
        try {
            const response = await NurseryProfileService.ListPaymentHistory();
            console.log(response);
            setNextPayment(response.content[response.content.length - 1].next_payment)
            setPackageName(response.content[0].package_name)
            setHistory(response.content);
        } catch (error) {
            toast.error(`${error}`);
        }
    }
    const tableData = [
        { id: 1, name: "Ahmed hamed", paymentId: 201, amount: "20 $", class:"Class A", date: "20-8-2024" , service:"Travel"},
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
                        <span>{packageName}</span>

                    </div>
                    
                </div>
                {/* <div className="col-lg-12 SubscriptionItem">
                    <div className="Title">

                        <span>Price</span>
                    </div>
                    <div className="Data">
                        <span>1000$</span>

                    </div>
                    
                </div> */}
                <div className="col-lg-12 SubscriptionItem">
                    <div className="Title">

                        <span>Next Builling Date</span>
                    </div>
                    <div className="Data">
                        <span>{nextPayment}</span>

                    </div>
                    
                </div>
            </div>
        
        </div>
        <div className="NurseryContainer NurseryGallery PaymentNurseryItem">
            
            <div className="AddGallery">
            <span>Payment History</span>
            </div>

            
            <div className="GalleryContainer NuseryPaymentHistory ">
            {history.map((row) => (
                <div className="col-lg-12 RecordEmpTable">
                    <div className="row">
                        
                        <div className="col-lg-6 col-md-6 col-sm-6 col-6 Center">
                            <span className="BranchTableSpan" data-content={row.date}>

                                {row.intial_payment}
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

import { faBell, faCommentDollar, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import './PaymentRequestItem.css';
import AddRequestModal from "./AddRequestModal";
import Kids from "../ManageClasses/Kids";
import KidTable from "../Table/KidTable";
import { KidsServices, PaymentRequestServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";

const PaymentRequestItem = ({SelectedClassId}) => {

    const [selectedRows, setSelectedRows] = useState([]);

    const handleSelectAllChange = (e) => {
        if (e.target.checked) {
            const allIds = kids.map(item => item.id);
            setSelectedRows(allIds);
        } else {
            setSelectedRows([]);
        }
    };

    const handleRowChange = (id) => {
        setSelectedRows((prevSelectedRows) => {
            if (prevSelectedRows.includes(id)) {
                return prevSelectedRows.filter(rowId => rowId !== id);
            } else {
                return [...prevSelectedRows, id];
            }
        });
    };

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    

    const handleAddRequest = async (serviceName, amount) => {
        try {
            const kids = selectedRows.map(id => ({ kid_id: id }));
            
            const requestData = {
                kids,
                service: serviceName,
                amount
            };
    
            console.log(requestData);
            const response = await PaymentRequestServices.Add(requestData);
            toast.success('Request added successfully');
        } catch (error) {
            console.error(error);
            toast.error('Failed to add request');
        }
    };
    

      const [kids , setKids] = useState([]);
      useEffect(()=>{
          GetData();
      },[]);
      async function GetData() {
          try {
      
              const response = await KidsServices.ListClassKids(SelectedClassId);
              
              setKids(response.content.kids);
          
          
          } catch (error) {
              console.log(error)
      
          }
      }
    

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
             <AddRequestModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddRequest={handleAddRequest}
            />
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Payment Request
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                        <div className="HeadRightItem">
                            <div className="CirclePlus" onClick={() => setIsOverlayOpen(true)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="SubjectsContainer PaymentRequestContainer">
                <div className="SelectAllContainer">
                    <div className="SelectAll">
                        <div className="InputSelectAll">
                            <input
                                type="checkbox"
                                name=""
                                id="SelectAll"
                                checked={selectedRows.length === kids.length}
                                onChange={handleSelectAllChange}
                            />
                            <label htmlFor="SelectAll">select all</label>
                        </div>
                    </div>
                </div>
            
                
                <div className="table-responsive TableContainer TableContainerEmployees BranchesTable">
                    
                    <div className="container">
                        <div className="row">
                        {kids.map((kid) => (
                            <div className="col-lg-12 RecordEmpTable" key={kid.id}>
                                <div to={`/kidprofile?kidId=${kid.id}`} className='nav-link'>
                                <div className="row">

                                <div className="col-lg-4 col-md-4 col-sm-4 col-2 Center KidNameCol SelectKidToRequest">
                                    <input
                                            type="checkbox"
                                            checked={selectedRows.includes(kid.id)}
                                            onChange={() => handleRowChange(kid.id)}
                                        />
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-6 col-5 Center KidNameCol">
                                        
                                        <span className="BranchTableSpan" data-content={kid.kid_name}>
                                            {kid.kid_name}
                                        </span>
                                        
                                    </div>
                                    <div className="col-lg-2 col-md-2 col-sm-2 col-3 KidIdCol">
                                        <span className="BranchTableSpan" data-content={kid.id}>

                                            {kid.id}
                                        </span>
                                        
                                        </div>
                                    

                                </div>
                                </div>
                        
                        </div>
                        ))}
                        </div>
                    </div>
                        


                    </div>
            </div>
        </section>
    );
};

export default PaymentRequestItem;

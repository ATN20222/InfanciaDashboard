import { faBell, faCommentDollar, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NurseryServices } from "../../Service/Api";

const Applications = () => {
    const tableData = [
        { id: 15458, name: "KiddyCorner", Plan: "Premium", Date:'12-2-2024' },
        { id: 25458, name: "KiddyCorner", Plan: "Premium", Date:'12-2-2024' }
    ];
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [nurseries , setNurseries] = useState([]);
    useEffect(()=>{
        GetData();
    },[])
    
    async function GetData() {
        try {
            const response = await NurseryServices.List('pending');
            // console.log("response",response);
            setNurseries(response.content)

        } catch (error) {
            console.error(error); 
        }
    }

    function formatDate(isoDateString) {
        const date = new Date(isoDateString);
        const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
        return formattedDate;
    }


    return (
        <section className="SecondSliderSection ManageClassesCompnent">

            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                        Applications
                        </div>
                    </div>
                    {/* <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                            <div className="SearchPayment SearchCol">
                                <input type="text" className="FormInput" name="" id="" placeholder="Search..."/>
                            </div>
                        <div className="HeadRightItem">
                            <div className="CirclePlus" onClick={()=>setIsOverlayOpen(true)}>
                                <FontAwesomeIcon icon={faSearch} />
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="SubjectsContainer">
               
                <div className="table-responsive TableContainer TableContainerEmployees BranchesTable">
                    
                                <div className="container">
                                    <div className="row">
                                    {nurseries.length>0?nurseries.map((row) => (
                                        <Link to={`/Applications/${row.id}`} className="col-lg-12 RecordEmpTable linkNursery">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-4 Center">
                                                    {row.name}
                                                    
                                                </div>
                                                <div className="col-lg-4 col-md-4 col-sm-4 col-4 Center">
                                                    <span className="BranchTableSpan" data-content={row.Date}>

                                                        {formatDate(row.created_at)}
                                                    </span>
                                                    
                                                    </div>


                                                <div className="col-lg-4 col-md-4 col-sm-4 col-4 Center">
                                                    <span className="BranchTableSpan" data-content={'Premium'}>

                                                        {'Premium'}
                                                    </span>
                                                    
                                                    </div>
                                                
                                       
                                    </div>
                                    </Link>
                                    ))
                                    :
                                    <span>No Nurseries Found</span>
                                    }
                                    </div>
                                </div>
                                    
                            
                       
                </div>
            </div>
           
        </section>
    );
};

export default Applications;

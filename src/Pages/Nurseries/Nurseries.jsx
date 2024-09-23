import { faBell, faCommentDollar, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NurseryServices } from "../../Service/Api";

const Nurseries = () => {
    const tableData = [
        { id: 15458, name: "KiddyCorner", Plan: "Premium", },
        { id: 25458, name: "KiddyCorner", Plan: "Premium", }
    ];
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [nurseries , setNurseries] = useState([]);
    useEffect(()=>{
        GetData();
    },[])
    
    async function GetData() {
        try {
            const response = await NurseryServices.List('accepted');
            console.log("response accept",response);
            setNurseries(response.content)
        } catch (error) {
            
            console.error(error);
        }
    }

    return (
        <section className="SecondSliderSection ManageClassesCompnent">

            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                        Nurseries
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
                                        <Link to={`/Nurseries/${row.id}`} className="col-lg-12 RecordEmpTable linkNursery">
                                            <div className="row">
                                            <div className="col-lg-1 col-md-1 col-sm-1 col-1 Center">
                                                    <span className="BranchTableSpan" data-content={row.id}>

                                                        {row.id}
                                                    </span>
                                                    
                                                    </div>

                                                <div className="col-lg-5 col-md-5 col-sm-5 col-5 Center">
                                                    {row.name}
                                                    
                                                </div>
                                                <div className="col-lg-1 col-md-1 col-sm-1 col-1 Center">
                                                    <span className="BranchTableSpan" data-content={row.kids_count}>

                                                        {row.kids_count+' kids'}
                                                    </span>
                                                    
                                                    </div>


                                                <div className="col-lg-5 col-md-5 col-sm-5 col-5 Center">
                                                    <span className="BranchTableSpan" data-content={'Gold'}>

                                                        {'Gold'}
                                                    </span>
                                                    
                                                    </div>
                                                
                                       
                                    </div>
                                    </Link>
                                    )):
                                    <span>No Nurseries Found</span>
                                    }
                                    </div>
                                </div>
                                    
                            
                       
                </div>
            </div>
           
        </section>
    );
};

export default Nurseries;

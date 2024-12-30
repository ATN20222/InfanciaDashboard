import { faBell, faCommentDollar, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import './Branches.css'
import AddBranchModal from "./AddBranchModal";
import { useSearchParams } from "react-router-dom";
import { BranchesServices } from "../../Service/Api";

const Branches = () => {
    const tableData = [
        { id: 1, name: "Ahmed hamed", Adress: "15st abas elakad , nasr city", PhoneNumber:"+201200835855",},
        { id: 2, name: "Ahmed hamed", Adress: "15st abas elakad , nasr city", PhoneNumber:"+201200835855",}
    ];
    const [Branches , setBranches ] = useState([]);
    const [searchParams] = useSearchParams();

    useEffect(()=>{
        GetData();
    },[]);
    async function GetData() {
        try {
            const response = await BranchesServices.List();            
            setBranches(response.content);
        
        
        } catch (error) {
            console.log(error)
    
        }
    }

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    useEffect(() => {
        if (searchParams.get("new") === "true") {
            setIsOverlayOpen(true);
        }
    }, [searchParams]);

    const handleAddRequest = (className) => {
        
      };

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
             <AddBranchModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddRequest={handleAddRequest}
            />
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Branches
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                            {/* <div className="SearchPayment SearchCol">
                                <input type="text" className="FormInput" name="" id="" placeholder="Search..."/>
                            </div> */}
                        <div className="HeadRightItem">
                            <div className="CirclePlus" onClick={()=>setIsOverlayOpen(true)}>
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="SubjectsContainer">

                <div className="table-responsive ">
                            <table className="table table table-bordered table-hover">
                                <thead className="thead-dark">
                                    <tr>
                                        <th scope="col">ID</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Phone</th>
                                        <th scope="col">address</th>
                                        <th scope="col">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Branches.length>0?Branches.map((branch) => (
                                        <tr key={branch.id}>
                                            <td>{branch.id}</td>
                                            
                                            <td>
                                                    {branch.name}
                                                
                                            </td>
                                            <td>{branch.PhoneNumber}</td>
                
                                        </tr>
                                    )):
                                    <tr>
                                        <td colSpan="3">
                                            No Data
                                        </td>
                                    </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
               
            </div>
           
        </section>
    );
};

export default Branches;

import { faBell, faCommentDollar, faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import AddFAQModal from "../../Components/FAQ/AddFAQModal";
import NurseryPolicyItem from "../../Components/NurseryPolicy/NurseryPolicyItem";
import AddNurseryPolicyModal from "../../Components/NurseryPolicy/AddNurseryPolicyModal";
import { PolicyServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
const NurseryPolicy = () => {
    const [policies , setPolicies] = useState([]);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    const Data = [
        { 
            id: 1, 
            Title: "Health awareness", 
            Description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente velit fugit numquam animi eaque quaerat mollitia. Dolores saepe itaque voluptate nemo, totam, exercitationem distinctio blanditiis dolore eius ducimus repellendus? Earum.` , 
           
        },
        { 
            id: 2, 
            Title: "Health awareness", 
            Description:`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente velit fugit numquam animi eaque quaerat mollitia. Dolores saepe itaque voluptate nemo, totam, exercitationem distinctio blanditiis dolore eius ducimus repellendus? Earum.` , 
           
        },
        
    ];

    useEffect(()=>{
        GetData();
    },[]);
    

    const handleAddPolicy = async (title, description ) => {
        try {
            const response = await PolicyServices.Add(title, description);
            toast.success('Policy added successfully');
            GetData();
        } catch (error) {
            console.log(error);
            toast.error('Failed to add policy');

        }
    };
    async function GetData() {
        try {

            const response = await PolicyServices.List();
            setPolicies(response.content);
            
        } catch (error) {
            console.log(error)

        }
    }
    const handleDeletePolicy = async (id)=>{
        try {
            const response = await PolicyServices.Delete(id);
            toast.success('Policy deleted successfully');
            GetData();
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete policy');

        }
    }
    return (
        <section className="SecondSliderSection ManageClassesCompnent">
             <AddNurseryPolicyModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddNurseryPolicy={handleAddPolicy}
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
                        Nursery Policy
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                        <div className="HeadRightItem">
                            <div className="CirclePlus" onClick={() => setIsOverlayOpen(true)} >
                                <FontAwesomeIcon icon={faPlus} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="DropDownContainer">

                <div className="row">
                {policies.length>0?policies.map((row) => (
                    <NurseryPolicyItem 
                        id={row.id}
                        key={row.id}
                        Title={row.title}
                        Description={row.content}
                        DeletePolicy={handleDeletePolicy}
                    />
                )):
                    <div className="Center">
                        No policies added yet
                    </div>
                }
                </div>
            </div>
            
               
           
        </section>
    );
};

export default NurseryPolicy;

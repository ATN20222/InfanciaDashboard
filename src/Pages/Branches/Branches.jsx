import { faBell, faCommentDollar, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import './Branches.css'
import AddBranchModal from "./AddBranchModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BranchesServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
import DeleteSubjectModal from "../../Components/ManageClasses/DeleteSubjectModal";

const Branches = () => {
    const tableData = [
        { id: 1, name: "Ahmed hamed", Adress: "15st abas elakad , nasr city", PhoneNumber: "+201200835855", },
        { id: 2, name: "Ahmed hamed", Adress: "15st abas elakad , nasr city", PhoneNumber: "+201200835855", }
    ];
    const [Branches, setBranches] = useState([]);
    const [searchParams] = useSearchParams();
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [branchToDelete, setBranchToDelete] = useState(null);
    useEffect(() => {
        GetData();
    }, []);
    const navigate = useNavigate();
    async function GetData() {
        try {
            const response = await BranchesServices.List();
            console.log(response);
            setBranches(response.content);
            console.log(response);

        } catch (error) {
            toast.error("You don't have the permission to reach this page")
            setTimeout(() => {
                navigate('/home')
            }, 2000);
            console.log(error)
        }
    }

    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    useEffect(() => {
        if (searchParams.get("new") === "true") {
            setIsOverlayOpen(true);
        }
    }, [searchParams]);

    const handleAddRequest = async (branchName, address, email, phone) => {
        try {
            const response = await BranchesServices.Add(branchName , phone, email,1,1,address);
            toast.success("Branch added successfully");
            GetData();
        } catch (error) {
            
            console.log(error)
            toast.error("Failed to add branch");
        }
    };
    const handleDeleteMeal = (id) => {
        setBranchToDelete(id);
        setIsDeleteOverlayOpen(true);
    }
    const handleConfirmDelete = async () => {
        try {
            const response = await BranchesServices.Delete(branchToDelete);
            toast.success('Branch deleted successfully');
            GetData();
        } catch (error) {
            toast.error('Failed to delete Branch');
        }
        setBranchToDelete(false);
    }

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
            <AddBranchModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddBranch={handleAddRequest}
            />
            <DeleteSubjectModal
                id={branchToDelete}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleConfirmDelete}
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
                            Branches
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                        {/* <div className="SearchPayment SearchCol">
                                <input type="text" className="FormInput" name="" id="" placeholder="Search..."/>
                            </div> */}
                        <div className="HeadRightItem">
                            <div className="CirclePlus" onClick={() => setIsOverlayOpen(true)}>
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
                                {/* <th scope="col">Phone</th> */}
                                <th scope="col">address</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Branches.length > 0 ? Branches.map((branch) => (
                                <tr key={branch.id}>
                                    <td>{branch.id}</td>

                                    <td>
                                        {branch.name}

                                    </td>
                                    <td>{branch.address}</td>
                                    <td>
                                        <span>
                                            <FontAwesomeIcon icon={faTrash}
                                                onClick={() => handleDeleteMeal(branch.id)}
                                            />
                                        </span>
                                    </td>

                                </tr>
                            )) :
                                <tr>
                                    <td colSpan="4">
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

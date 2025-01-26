import { faBell, faCommentDollar, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import './Branches.css';
import AddBranchModal from "./AddBranchModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BranchesServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
import DeleteSubjectModal from "../../Components/ManageClasses/DeleteSubjectModal";
import { getBranchId, setBranchId } from "../../Service/AxiosApi";

const Branches = () => {
    const [Branches, setBranches] = useState([]);
    const [searchParams] = useSearchParams();
    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [branchToDelete, setBranchToDelete] = useState(null);
    const navigate = useNavigate();
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    useEffect(() => {
        GetData();
    }, []);

    useEffect(() => {
        if (searchParams.get("new") === "true") {
            setIsOverlayOpen(true);
        }
    }, [searchParams]);

    async function GetData() {
        try {
            const response = await BranchesServices.List();
            setBranches(response.content);
            if(getBranchId() === null){
                toast.error("Please set the main branch");
            }   
        } catch (error) {
            toast.error("You don't have the permission to reach this page");
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        }
    }

    const handleAddRequest = async (branchName, address, email, phone) => {
        try {
            await BranchesServices.Add(branchName, phone, email, 1, 1, address);
            toast.success("Branch added successfully");
            GetData();
        } catch (error) {
            toast.error("Failed to add branch");
        }
    };

    const handleDeleteMeal = (id) => {
        setBranchToDelete(id);
        setIsDeleteOverlayOpen(true);
    };

    const handleConfirmDelete = async () => {
        try {
            await BranchesServices.Delete(branchToDelete);
            toast.success('Branch deleted successfully');
            GetData();
        } catch (error) {
            toast.error('Failed to delete Branch');
        }
        setBranchToDelete(null);
    };

    const handleSetMainBranch = async (id) => {
        try {
            await BranchesServices.SetMainBranch(id);
            setBranchId(id);
            toast.success("Main branch updated successfully");
            GetData();
        } catch (error) {
            toast.error("Failed to update main branch");
        }
    };

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
                <Toaster position="top-right" reverseOrder={false} />
            </div>
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">
                            Branches
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
            <div className="SubjectsContainer">
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Address</th>
                                <th scope="col">Main Branch</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Branches.length > 0 ? Branches.map((branch) => (
                                <tr key={branch.id}>
                                    <td>{branch.id}</td>
                                    <td>{branch.name}</td>
                                    <td>{branch.address}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={branch.main === 1}
                                            onChange={() => handleSetMainBranch(branch.id)}
                                        />
                                    </td>
                                    <td>
                                        <span>
                                            <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteMeal(branch.id)} />
                                        </span>
                                    </td>
                                </tr>
                            )) :
                                <tr>
                                    <td colSpan="5">No Data</td>
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

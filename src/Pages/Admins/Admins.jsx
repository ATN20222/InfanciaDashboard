import { faBell, faChalkboard, faCommentDollar, faPlus, faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import './Admins.css'
import AddAdminModal from "./AddAdminModal";
import DeleteSubjectModal from "../../Components/ManageClasses/DeleteSubjectModal";
import { AuthService, NurseryServices } from "../../Service/Api";
import toast, { Toaster } from "react-hot-toast";
import { getBranchId, getNurseryId } from "../../Service/AxiosApi";
import AssignTeacherClass from "./AssignTeacherClass";

const Admins = () => {
    const tableData = [
        { id: 1, name: "Ahmed hamed", Role: "Top Admin" },
        { id: 2, name: "Ahmed hamed", Role: "Top Admin" }
    ];
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [isAssignOverlayOpen, setIsAssignOverlayOpen] = useState(false);
    const [adminToDelete, setAdminToDelete] = useState(false);
    const [adminToAssign, setAdminToAssign] = useState(false);

    const [isDeleteOverlayOpen, setIsDeleteOverlayOpen] = useState(false);
    const [admins, setAdmins] = useState([]);
    

    useEffect(() => {
        GetData();
    }, []);
    async function GetData() {
        try {

            const response = await NurseryServices.ListAdmins();
            console.log('admins', response);
            setAdmins(response.content);
        } catch (error) {
            console.log(error)

        }
    }
    const handleDelete = async () => {
        try {
            const response = await NurseryServices.DeleteAdmin(adminToDelete);
            toast.success('Admin deleted successfully');
            GetData();

        } catch (error) {
            toast.error('Failed to delete admin');
        }
        setAdminToDelete(null);
    };
    const handleAddRequest = async (name, role, email, phoneNumber, roleItems) => {
        // console.log(name, role, email, phoneNumber, password , classes);
        try {
            // const formattedClasses = classes.map(c => ({ class_id: c.id })); 
            // console.log(classes['classes']);

            const permissions = roleItems
                .filter(item => item.Selected === 1)
                .map(item => (item.Name));
            const data = {};
            data.name = name;
            data.role = role;
            data.email = email;
            data.phone = phoneNumber;
            data.managments = permissions;
            data.nursery_id = getNurseryId();
            data.branch_id = getBranchId();
            console.log(data);

            const response = await AuthService.AddNewAdmin(data);
            toast.success('Admin added successfully');
            GetData();

        } catch (error) {
            toast.error(`${error}`);

        }
    };
    const handleAssignRequest = async (obj) => {
        try {
            const response = await AuthService.AssignClasses(obj);
            toast.success('Classes Assigned successfully');
            GetData();
        } catch (error) {
            toast.error(`${error}`);
        }
        setAdminToAssign('');
    };
    

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
            <AddAdminModal
                isOpen={isOverlayOpen}
                onClose={() => setIsOverlayOpen(false)}
                onAddAdmin={handleAddRequest}
            />
            {isAssignOverlayOpen &&
            
            <AssignTeacherClass
                id={adminToAssign}
                isOpen={isAssignOverlayOpen}
                onClose={() => setIsAssignOverlayOpen(false)}
                onAssignClasses={handleAssignRequest}
            />
            }
            <DeleteSubjectModal
                id={adminToDelete}
                isOpen={isDeleteOverlayOpen}
                onClose={() => setIsDeleteOverlayOpen(false)}
                onDelete={handleDelete}
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
                            Admins
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
            <div className="SubjectsContainer AdminsTableContainer">

                <div className="table-responsive ">
                    <table className="table table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phone</th>
                                <th scope="col">email</th>
                                <th scope="col">Assign Classes</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {admins.length > 0 ? admins.map((admin) => (
                                <tr key={admin.id}>
                                    <td>{admin.id}</td>

                                    <td>
                                        {admin.name}

                                    </td>
                                    <td>{admin.phone}</td>
                                    <td>{admin.email}</td>
                                    <td>{admin.role==='teacher'?
                                        <FontAwesomeIcon 
                                            className="pointer" 
                                            icon={faChalkboard}
                                            onClick={() => { setIsAssignOverlayOpen(true); setAdminToAssign(admin.id);}}    
                                        />
                                        :
                                        "Admin"
                                        }</td>
                                    <td>
                                        <span>
                                            <FontAwesomeIcon icon={faTrash}
                                                onClick={() => { setIsDeleteOverlayOpen(true); setAdminToDelete(admin.id)}}/>
                                        </span>
                                    </td>

                                </tr>
                            )) :
                                <tr>
                                    <td colSpan="6">
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

export default Admins;

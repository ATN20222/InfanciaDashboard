import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFilter, faPen } from "@fortawesome/free-solid-svg-icons";
import { NurseryServices } from "../../Service/Api";
import InfanciaImage from "../../Assets/images/INFANCIA_LOGO.png";
import './Nurseries.css'
import ChangeNurseryStatusModal from "./ChangeNurseryStatusModal";
import toast, { Toaster } from "react-hot-toast";
const Nurseries = () => {
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    const [nurseries, setNurseries] = useState([]);
    const [status, setStatus] = useState('all');
    const [NurseryIdToChangeStatus, setNurseryIdToChangeStatus] = useState(null);
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);

    useEffect(() => {
        GetData();
    }, [status]); 

    async function GetData() {
        try {
            const response = await NurseryServices.List(status);
            console.log("response accept", response);
            setNurseries(response.content || []);
        } catch (error) {
            console.error(error);
        }
    }
    const handleNurseryStatusChange = async (id, status) => {
        try {
            await NurseryServices.ChangeStatus(id, status);
            toast.success('Status changed successfully');
            GetData();
        } catch (error) {
            console.error(error);
        }finally{
            setNurseryIdToChangeStatus(null);
        }
    };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setIsFilterMenuOpen(false); // Close the dropdown menu
    };

    return (
        <section className="SecondSliderSection ManageClassesCompnent">
            <div className="Toaster">
                <Toaster position="top-right" reverseOrder={false} />
            </div>
            <ChangeNurseryStatusModal 
                id={NurseryIdToChangeStatus}
                isOpen={isOverlayOpen} 
                onClose={() => setIsOverlayOpen(false)} 
                onStatusChange={handleNurseryStatusChange} 
                />
            <div className="Container HeadContainer">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="HeadLeftItem">Nurseries</div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 col-6 HeadRightCol">
                        <div className="HeadRightItem">
                            <div className="CirclePlus" onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}>
                                <FontAwesomeIcon icon={faFilter} />
                            </div>
                            {isFilterMenuOpen && (
                                <div className="FilterMenu">
                                    <ul>
                                        <li onClick={() => handleStatusChange("pending")}>Pending</li>
                                        <li onClick={() => handleStatusChange("accepted")}>Accepted</li>
                                        <li onClick={() => handleStatusChange("rejected")}>Rejected</li>
                                        <li onClick={() => handleStatusChange("all")}>All</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="SubjectsContainer NurseriesTableContainer">
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Photo</th>
                                <th scope="col">Name</th>
                                <th scope="col">Status</th>
                                <th scope="col">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {nurseries.length > 0 ? (
                                nurseries.map((n) => (
                                    <tr key={n.id}>
                                        <td>{n.id}</td>
                                        <td className="text-center">
                                            <img
                                                src={n.media?.[0]?.original_url || InfanciaImage}
                                                width="30px"
                                                alt={`${n.name} avatar`}
                                                className="avatar"
                                            />
                                        </td>
                                        <td>{n.name}</td>
                                        <td>{n.status}</td>
                                        <td>
                                            <span onClick={()=>{
                                                setNurseryIdToChangeStatus(n.id);
                                                setIsOverlayOpen(true);
                                            }} className="nav-link">
                                                <FontAwesomeIcon icon={faPen} />
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No Data</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Nurseries;

import React from 'react';
import './KidTable.css';
import { Link } from 'react-router-dom';
import kidImage from '../../Assets/images/INFANCIA_LOGO.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
const KidTable = ({ kids }) => {
    return (
        <div className="table-responsive ">
            <table className="table table table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Photo</th>
                        <th scope="col">Name</th>
                        <th scope="col">Gender</th>
                        <th scope="col">View Profile</th>
                    </tr>
                </thead>
                <tbody>
                    {kids?.length>0?kids.map((kid) => (
                        <tr key={kid.id}>
                            <td>{kid.id}</td>
                            <td className="text-center">
                                <img 
                                    src={(kid.media&&kid?.media[0]?.original_url)? kid?.media[0]?.original_url:kidImage} 
                                    width="30px"
                                    alt={`${kid.kid_name} avatar`} 
                                    className="avatar"
                                />
                            </td>
                            <td>
                                {/* <Link to={`/kidprofile?kidId=${kid.id}`} className="nav-link"> */}
                                    {kid.first_name + " " + kid.last_name}
                                {/* </Link> */}
                            </td>
                            <td>{kid.gender}</td>
                            <td>
                                <Link to={`/kidprofile?kidId=${kid.id}`} className="nav-link">
                                    <FontAwesomeIcon icon={faEye}/>
                                </Link>
                            </td>

                        </tr>
                    )):
                    <tr>
                        <td colSpan="5">
                            No Data
                        </td>
                    </tr>
                    }
                </tbody>
            </table>    
        </div>
    );
};

export default KidTable;

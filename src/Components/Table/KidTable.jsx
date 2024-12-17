import React from 'react';
import './KidTable.css';
import { Link } from 'react-router-dom';

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
                    </tr>
                </thead>
                <tbody>
                    {kids.length>0?kids.map((kid) => (
                        <tr key={kid.id}>
                            <td>{kid.id}</td>
                            <td className="text-center">
                                <img 
                                    src={kid.media[0]?.original_url} 
                                    width="30px"
                                    alt={`${kid.kid_name} avatar`} 
                                    className="avatar"
                                />
                            </td>
                            <td>
                                <Link to={`/kidprofile?kidId=${kid.id}`} className="nav-link">
                                    {kid.kid_name}
                                </Link>
                            </td>
                            <td>{kid.gender}</td>

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
    );
};

export default KidTable;

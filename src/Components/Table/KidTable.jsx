// KidTable.js
import React from 'react';
import './KidTable.css';

const KidTable = ({ kids }) => {
    return (
        <div className="table-responsive TableContainer TableContainerEmployees BranchesTable">
                    
        <div className="container">
            <div className="row">
            {kids.map((kid) => (
                <div className="col-lg-12 RecordEmpTable">
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-8 col-8 Center KidNameCol">
                            <div className="avatar"></div>
                            <span className="BranchTableSpan" data-content={kid.kid_name}>
                                {kid.kid_name}
                            </span>
                            
                            </div>
                        <div className="col-lg-4 col-md-3 col-sm-3 col-3 KidIdCol">
                            <span className="BranchTableSpan" data-content={kid.id}>

                                {kid.id}
                            </span>
                            
                            </div>
                        

                    </div>
               
            </div>
            ))}
            </div>
        </div>
            
    

</div>
    );
};

export default KidTable;

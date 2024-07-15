// KidTable.js
import React from 'react';
import './KidTable.css';

const KidTable = ({ kids }) => {
    return (
        <div className="kid-table">
            {kids.map((kid, index) => (
                <div key={index} className="kid-row">
                    <div className="kid-info">
                        <div className="kidNameAndImage">
                            <div className="kid-avatar"></div>
                            <span className="kid-name">{"Ahmed mahmoud hamed"}</span>
                        </div>
                        
                        <span className="kid-id">{kid.id}</span>
                        {/* <span className="kid-date">{kid.date}</span> */}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default KidTable;

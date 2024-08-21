import React from 'react';
import './HomeCard.css';

const HomeCard = ({Title , Text , Number , Link}) => {
  return (
    <div className="HomeCard">
      <div className="circle-container">
        <svg className="progress-circle" viewBox="0 0 36 36">
          <path
            className="circle-bg"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <path
            className="circle"
            strokeDasharray="75, 100"
            d="M18 2.0845
               a 15.9155 15.9155 0 0 1 0 31.831
               a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <text x="18" y="20.35" className="percentage">{Number}</text>
        </svg>
      </div>
      <div className="card-content">
        <div className="card-header">
          <h3>{Title}</h3>
          <span className="view-link">View</span>
        </div>
        <p>{Text}</p>
        {/* <div className="card-footer">
          <span>⇩ 0.1% Since 1y</span>
          <svg className="trend-chart" viewBox="0 0 100 20">
            <polyline
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              points="0,15 20,10 40,12 60,8 80,10 100,5"
            />
          </svg>
        </div> */}
      </div>
    </div>
  );
}

export default HomeCard;

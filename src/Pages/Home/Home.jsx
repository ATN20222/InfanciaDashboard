import React, { useEffect } from "react";
import HomeCard from "../../Components/Home/HomeCard";
import toast, { Toaster } from "react-hot-toast";
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import './Home.css'
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, LineElement, PointElement, Tooltip, Legend);

const Home = () => {
    useEffect(() => {
        const hasWelcomed = localStorage.getItem("hasWelcomed");

        if (!hasWelcomed) {
            toast.success('Welcome');
            localStorage.setItem("hasWelcomed", "true");
        }
    }, []);

    // Data for the overall charts
    const barData = {
        labels: ['Employees', 'Admins', 'Branches'],
        datasets: [
            {
                label: 'Count',
                data: [100, 50, 10],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
            },
        ],
    };

    const pieData = {
        labels: ['Teachers', 'Admins', 'Branches'],
        datasets: [
            {
                label: 'Distribution',
                data: [100, 50, 10],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
                hoverOffset: 4,
            },
        ],
    };

    // Data for the Branches growth chart
    const branchGrowthData = {
        labels: ['2019', '2020', '2021', '2022', '2023'],
        datasets: [
            {
                label: 'Branches Growth',
                data: [2, 3, 5, 7, 10], // Hypothetical growth data
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                tension: 0.1,
            },
        ],
    };

    return (
        <div className="Home">
            <div className="Toaster">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </div>
            <div className="container">
                <div className="row Center">
                    <div className="col-lg-4">
                        <HomeCard 
                            Title={"Teachers"} 
                            Text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
                            Number={"100"}
                            link={'teachers'}
                        />
                    </div>
                    <div className="col-lg-4">
                        <HomeCard 
                            Title={"Admins"} 
                            Text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
                            Number={"50"}
                            link={'admins'}
                        />
                    </div>
                    <div className="col-lg-4">
                        <HomeCard 
                            Title={"Branches"} 
                            Text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet"}
                            Number={"10"}
                            link={'branches'}

                        />
                    </div>
                </div>
                <div className="container">

                    <div className="row ChartsRow">
                        <div className="col-lg-4 PieChartCol">
                            <h5>Distribution</h5>
                            <Pie data={pieData} />
                        </div>
                        <div className="col-lg-4">
                            <h5>Employee, Admins, and Branches Count</h5>
                            <Bar data={barData} />
                        </div>
                        
                        <div className="col-lg-4">
                            <h5>Branches Growth Over Time</h5>
                            <Line data={branchGrowthData} />
                        </div>
                        
                    </div>
                </div>

                <div className="row">
                    
                </div>
            </div>
        </div>
    );
}

export default Home;

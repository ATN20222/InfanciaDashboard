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
                backgroundColor: ['#ED6D91', '#009FE3', '#AED065'],
            },
        ],
    };

    const pieData = {
        labels: ['Teachers', 'Admins', 'Branches'],
        datasets: [
            {
                label: 'Distribution',
                data: [100, 50, 10],
                backgroundColor: ['#ED6D91', '#009FE3', '#AED065'],
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
                backgroundColor: '#ED6D91',
                borderColor: '#ED6D91',
                tension: 0.1,
            },
        ],
    };

    // Chart options to control size
    const chartOptions = {
        maintainAspectRatio: false, // Disable the aspect ratio to allow custom size
        responsive: true,
        plugins: {
            legend: {
                position: 'top', // Position of the legend
            },
        },
        layout: {
            padding: 20, // Adds padding around the chart
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
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
                    <div className="col-lg-6">
                        <HomeCard 
                            Title={"Teachers"} 
                            Text={"View Nursery teachers and manage them easy"}
                            Number={"100"}
                            link={'teachers'}
                        />
                    </div>
                    <div className="col-lg-6">
                        <HomeCard 
                            Title={"Admins"} 
                            Text={"View your admins and manage them easy"}
                            Number={"50"}
                            link={'admins'}
                        />
                    </div>
                    {/* <div className="col-lg-4">
                        <HomeCard 
                            Title={"Branches"} 
                            Text={"View your branches and manage them easy."}
                            Number={"10"}
                            link={'branches'}

                        />
                    </div> */}
                </div>
                <div className="container">
                    <div className="row ChartsRow">
                        <div className="col-lg-4 PieChartCol">
                            <div className="ChartItem">
                                <div className="Center" style={{ width: '100%', height: '400px' }}>
                                    <Pie data={pieData} />
                                </div>
                                {/* <h5>Distribution</h5> */}
                                <span>Distribution</span>
                            </div>
                            
                        </div>
                        <div className="col-lg-4">
                                <div className="ChartItem">
                                    <div style={{ width: '100%', height: '400px' }}>
                                        <Bar data={barData} options={chartOptions} />
                                    </div>
                                <span>Employee, Admins, and Branches Count</span>
                                </div>
                            
                        </div>
                        <div className="col-lg-4">
                            <div className="ChartItem">
                                <div style={{ width: '100%', height: '400px' }}>
                                    <Line data={branchGrowthData} options={chartOptions} />
                                </div>

                                <span>Branches Growth Over Time</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

import React, { useEffect, useState } from "react";
import HomeCard from "../../Components/Home/HomeCard";
import toast, { Toaster } from "react-hot-toast";
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import './Home.css'
import { NurseryProfileService } from "../../Service/Api";
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, LineElement, PointElement, Tooltip, Legend);

const Home = () => {
    const [employeesCount, setEmployeesCount] = useState('');
    const [parentsCounts, setParentsCounts] = useState('');
    const [kidsCount, setKidsCount] = useState('');
    const [classesCount, setClassesCount] = useState('');

    useEffect(() => {
        const hasWelcomed = localStorage.getItem("hasWelcomed");
        GetData();
        if (!hasWelcomed) {
            toast.success('Welcome');
            localStorage.setItem("hasWelcomed", "true");
        }
    }, []);

    async function GetData() {
        try {
            const response = await NurseryProfileService.HomeInfo();
            setClassesCount(response.content.classRooms_counts)
            setEmployeesCount(response.content.users_counts);
            setKidsCount(response.content.kids_counts)
            setParentsCounts(response.content.parent_counts)
        } catch (error) {
            toast.error(`${error}`);
        }
    }

    // Data for the overall charts
    const barData = {
        labels: ['Classes', 'Kids'],
        datasets: [
            {
                label: 'Count',
                data: [classesCount, kidsCount],
                backgroundColor: ['#ED6D91', '#009FE3'],
            },
        ],
    };

    const pieData = {
        labels: ['Parents', 'Kids'],
        datasets: [
            {
                label: 'Distribution',
                data: [parentsCounts, kidsCount],
                backgroundColor: ['#ED6D91', '#009FE3'],
                hoverOffset: 4,
            },
        ],
    };

    // Data for the Branches growth chart
    const branchGrowthData = {
        labels: ['2024'],
        datasets: [
            {
                label: 'Kids Count',
                data: [kidsCount], // Hypothetical growth data
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
                            Title={"Kids"} 
                            Text={"View kids roles and manage them easy"}
                            Number={kidsCount}
                            link={'manageclasses'}
                        />
                    </div>
                    <div className="col-lg-6">
                        <HomeCard 
                            Title={"Admins"} 
                            Text={"View your admins and manage them easy"}
                            Number={employeesCount}
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
                                <span>Classes and Kids Count</span>
                                </div>
                            
                        </div>
                        <div className="col-lg-4">
                            <div className="ChartItem">
                                <div style={{ width: '100%', height: '400px' }}>
                                    <Line data={branchGrowthData} options={chartOptions} />
                                </div>

                                <span>Kids Growth Over Time</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;

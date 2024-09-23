import React, { useEffect, useState } from "react";
import HomeCard from "../../Components/Home/HomeCard";
import toast, { Toaster } from "react-hot-toast";
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, ArcElement, LineElement, PointElement, Tooltip, Legend } from 'chart.js';
import './Home.css'
import { AuthService } from "../../Service/Api";
ChartJS.register(BarElement, CategoryScale, LinearScale, ArcElement, LineElement, PointElement, Tooltip, Legend);

const HomeSuper = () => {
    const [employeesCount, setEmployeesCount] = useState('');
    const [kidsCount, setKidsCount] = useState([]); // This is already here
    const [nurseryAccepted, setNurseryAccepted] = useState('');
    const [nurseryPending, setNurseryPending] = useState('');
    
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
            const response = await AuthService.SuperAdminHome();
            console.log(response);
            setEmployeesCount(response.content.employees_count);
            setNurseryAccepted(response.content.nursery_accepted);
            setNurseryPending(response.content.nursery_pending);
            setKidsCount(response.content.nurseries_childs); // Kids count is set here
        } catch (error) {
            toast.error(`${error}`);
        }
    }

    // Data for the overall charts
    const barData = {
        labels: ['Applications', 'Accepted Nurseries'],
        datasets: [
            {
                label: 'Count',
                data: [nurseryPending, nurseryAccepted],
                backgroundColor: ['#ED6D91', '#009FE3'],
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

    const branchGrowthData = {
        labels: ['Aug 2024', 'Sep 2024'],
        datasets: [
            {
                label: 'Nurseries Growth',
                data: [0, nurseryAccepted],
                fill: false,
                backgroundColor: '#ED6D91',
                borderColor: '#ED6D91',
                tension: 0.1,
            },
        ],
    };

    const kidsCountData = {
        labels: kidsCount.map(nursery => nursery.name),
        datasets: [
            {
                label: 'Kids Count',
                data: kidsCount.map(nursery => nursery.kids_count),
                backgroundColor: '#AED065',
            },
        ],
    };

    const chartOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        layout: {
            padding: 20,
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
                <Toaster position="top-right" reverseOrder={false} />
            </div>
            <div className="container">
                <div className="row Center">
                    <div className="col-lg-6">
                        <HomeCard 
                            Title={"Applications"} 
                            Text={"View nurseries registered in our software"}
                            Number={nurseryPending}
                            link={'Applications'}
                        />
                    </div>
                    <div className="col-lg-6">
                        <HomeCard 
                            Title={"Admins"} 
                            Text={"View your admins and manage them easily"}
                            Number={employeesCount}
                            link={'admins'}
                        />
                    </div>
                </div>
                <div className="container">
                    <div className="row ChartsRow">
                        <div className="col-lg-4">
                            <div className="ChartItem">
                                <div style={{ width: '100%', height: '400px' }}>
                                    <Bar data={barData} options={chartOptions} />
                                </div>
                                <span>Accepted-Pending Nurseries</span>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="ChartItem">
                                <div style={{ width: '100%', height: '400px' }}>
                                    <Line data={branchGrowthData} options={chartOptions} />
                                </div>
                                <span>Nurseries Growth Over Time</span>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="ChartItem">
                                <div style={{ width: '100%', height: '400px' }}>
                                    <Bar data={kidsCountData} options={chartOptions} />
                                </div>
                                <span>Kids Count Per Nursery</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row ChartsRow">
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeSuper;

/**
 * CampAttendanceReport component
 * Displays camp attendance and service usage data for a specific health organization
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CampAttendanceReport.scss';
import { Patient } from '../../models/patient';
import { PatientRecord } from '../../models/patientRecord';
import {
    BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, PieChart, Pie, Cell
} from 'recharts';

interface CampAttendanceReportProps {
    healthOrgId: string;
}

interface DataEntry {
    name: string;
    count: number;
    color?: string;
}

interface DashboardData {
    campAttendance: DataEntry[];
    serviceUsage: DataEntry[];
    monthlyData?: any[];
}

/**
 * CampAttendanceReport component
 * @param {CampAttendanceReportProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
const CampAttendanceReport: React.FC<CampAttendanceReportProps> = ({ healthOrgId }) => {
    const [data, setData] = useState<DashboardData>({ campAttendance: [], serviceUsage: [], monthlyData: [] });
    const [page, setPage] = useState('home');
    const [attendanceFilter, setAttendanceFilter] = useState(0);
    const [serviceFilter, setServiceFilter] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    /**
     * Fetches camp attendance and service usage data from the API
     */
    const fetchData = async () => {
        try {
            const patientsResponse = await axios.get(`http://localhost:3000/patients/organization/${healthOrgId}`);
            const patients: Patient[] = patientsResponse.data;
            const patientIds = patients.map(patient => patient._id);
            const recordsResponse = await axios.get(`http://localhost:3000/patientRecords/patients?patientIds=${patientIds.join(',')}`);
            const patientRecords: PatientRecord[] = recordsResponse.data;

            const campAttendanceData: { [key: string]: number } = {};
            const serviceUsageData: { [key: string]: number } = {};
            const monthlyData = [
                { month: 'January', attendance: 120 },
                { month: 'February', attendance: 210 },
                { month: 'March', attendance: 150 },
            ];

            patientRecords.forEach(record => {
                const campName = record.campID ? record.campID.campName : "Unknown Camp";
                campAttendanceData[campName] = (campAttendanceData[campName] || 0) + 1;

                if (record.serviceDetails) {
                    record.serviceDetails.forEach(service => {
                        const serviceName = service ? service.serviceName : "Unknown Service";
                        serviceUsageData[serviceName] = (serviceUsageData[serviceName] || 0) + 1;
                    });
                }
            });

            const serviceUsageWithColors = Object.keys(serviceUsageData).map(key => ({
                name: key,
                count: serviceUsageData[key],
                color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
            }));

            setData({
                campAttendance: Object.keys(campAttendanceData).map(key => ({ name: key, count: campAttendanceData[key] })),
                serviceUsage: serviceUsageWithColors,
                monthlyData
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    /**
     * Renders the home page content
     * @returns {JSX.Element} Home page content
     */
    const renderHome = () => (
        <>
            <h2>Camp Attendance</h2>
            <div className="chart-box">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.campAttendance}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <h2>Service Usage</h2>
            <div className="chart-box">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data.serviceUsage}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="count" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );

    /**
     * Renders the reports page content
     * @returns {JSX.Element} Reports page content
     */
    const renderReports = () => {
        const filteredCampAttendance = data.campAttendance.filter(entry => entry.count >= attendanceFilter);
        const filteredServiceUsage = data.serviceUsage.filter(entry => entry.count >= serviceFilter);

        return (
            <>
                <h2>Detailed Reports</h2>
                <div className="filters">
                    <label>
                        Minimum Camp Attendance:
                        <input type="number" value={attendanceFilter} onChange={e => setAttendanceFilter(Number(e.target.value))} />
                    </label>
                    <label>
                        Minimum Service Usage:
                        <input type="number" value={serviceFilter} onChange={e => setServiceFilter(Number(e.target.value))} />
                    </label>
                </div>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Camp Name</th>
                            <th>Attendance Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCampAttendance.map(item => (
                            <tr key={item.name}>
                                <td>{item.name}</td>
                                <td>{item.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>Service Name</th>
                            <th>Usage Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredServiceUsage.map(item => (
                            <tr key={item.name}>
                                <td>{item.name}</td>
                                <td>{item.count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </>
        );
    };

    /**
     * Renders the analytics page content
     * @returns {JSX.Element} Analytics page content
     */
    const renderAnalytics = () => (
        <>
            <h2>Advanced Analytics</h2>
            <div className="chart-container">
                <div className="line-chart">
                    <p>Monthly Trends in Camp Attendance:</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data.monthlyData}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="attendance" stroke="#8884d8" activeDot={{ r: 8 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="pie-chart">
                    <p>Service Usage Distribution:</p>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={data.serviceUsage}
                                dataKey="count"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={120}
                                fill="#82ca9d"
                                label
                            >
                                {data.serviceUsage.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color || "#8884d8"} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    );

    /**
     * Renders the appropriate content based on the current page
     * @returns {JSX.Element} Page content
     */
    const renderContent = () => {
        switch (page) {
            case 'home': return renderHome();
            case 'reports': return renderReports();
            case 'analytics': return renderAnalytics();
            default: return <h2>Welcome to the Dashboard</h2>;
        }
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar" data-aos="fade-rigth">
                <h1>Dashboard</h1>
                <a href="#" onClick={() => setPage('home')}>Home</a>
                <a href="#" onClick={() => setPage('reports')}>Reports</a>
                <a href="#" onClick={() => setPage('analytics')}>Analytics</a>
            </div>
            <div className="main-content" data-aos="fade-left">
                {renderContent()}
            </div>
        </div>
    );
};

export default CampAttendanceReport;
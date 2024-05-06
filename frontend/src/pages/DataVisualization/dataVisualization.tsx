//DataVisualization component that displays the data visualization charts for donations, health organizations, and volunteers.
//It uses the recharts library to render the charts.
import React from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './dataVisualization.scss'; 
import About from './about';
import { useTranslation } from 'react-i18next'; 


const DataVisualization: React.FC = () => {
  // Sample data for donations, health organizations, and volunteers
  const donationsData = [
    { name: 'January', donations: 1000 },
    { name: 'February', donations: 3500 },
    { name: 'March', donations: 1000 },
    { name: 'April', donations: 2500 },
    { name: 'May', donations: 5000 },
  ];

  const healthOrgData = [
    { name: 'January', healthOrgs: 5 },
    { name: 'February', healthOrgs: 6 },
    { name: 'March', healthOrgs: 4 },
    { name: 'April', healthOrgs: 8 },
    { name: 'May', healthOrgs: 7 },
  ];

  const volunteersData = [
    { name: 'January', volunteers: 20 },
    { name: 'February', volunteers: 25 },
    { name: 'March', volunteers: 60 },
    { name: 'April', volunteers: 35 },
    { name: 'May', volunteers: 40 },
  ];

  const { t } = useTranslation('common');

  return (
    <div  data-aos="fade-up">
        <About />
    
    <div className="visualization-container">
      <div className="chart-section">
        <h2 className="chart-title">{t('about.donations')}</h2>
        <BarChart width={500} height={300} data={donationsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="donations" fill="#8884d8" />
        </BarChart>
      </div>

      <div className="chart-section">
        <h2 className="chart-title">{t('about.healthorg')}</h2>
        <LineChart width={500} height={300} data={healthOrgData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="healthOrgs" stroke="#82ca9d" />
        </LineChart>
      </div>

      <div className="chart-section">
        <h2 className="chart-title">{t('about.volunteer')}</h2>
        <PieChart width={500} height={300}>
          <Pie data={volunteersData} dataKey="volunteers" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
            {
              volunteersData.map((index) => (
                <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
              ))
            }
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
    </div>
  );
};

export default DataVisualization;

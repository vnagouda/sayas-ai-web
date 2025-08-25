import React, { useState, useEffect } from 'react';
import { Tabs, Tab } from '../../components/ui/tabs';
import StatsCard from './StatsCard';

const tabs = [
  {
    label: 'Today',
    range: 'today',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    label: 'Week',
    range: 'week',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    label: 'Month',
    range: 'month',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    label: 'Quarter',
    range: 'quarter',
    startDate: new Date(),
    endDate: new Date(),
  },
  {
    label: 'Year',
    range: 'year',
    startDate: new Date(),
    endDate: new Date(),
  },
];

const calculateStats = (tab, leads) => {
  switch (tab.range) {
    case 'today':
      return leads.filter((lead) => lead.createdAt >= tab.startDate && lead.createdAt <= tab.endDate);
    case 'week':
      return leads.filter((lead) => lead.createdAt >= tab.startDate && lead.createdAt <= tab.endDate);
    case 'month':
      return leads.filter((lead) => lead.createdAt >= tab.startDate && lead.createdAt <= tab.endDate);
    case 'quarter':
      return leads.filter((lead) => lead.createdAt >= tab.startDate && lead.createdAt <= tab.endDate);
    case 'year':
      return leads.filter((lead) => lead.createdAt >= tab.startDate && lead.createdAt <= tab.endDate);
    default:
      return [];
  }
};

const StatsTabs = ({ leads }) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const calculatedStats = calculateStats(selectedTab, leads);
    setStats(calculatedStats);
  }, [selectedTab, leads]);

  return (
    <div>
      <Tabs>
        {tabs.map((tab) => (
          <Tab key={tab.label} label={tab.label} onClick={() => setSelectedTab(tab)}>
            {tab.label}
          </Tab>
        ))}
      </Tabs>
      <StatsCard stats={stats} />
    </div>
  );
};

export default StatsTabs;
"use client";

import React, { useState } from 'react';
import { Layout } from '../components/Layout';
import { Dashboard } from '../components/Dashboard';
import { Benefits } from '../components/Benefits';
import { Categories } from '../components/Categories';
import { Associations } from '../components/Associations';
import { Users } from '../components/Users';

export default function Page() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'benefits': return <Benefits />;
      case 'categories': return <Categories />;
      case 'associations': return <Associations />;
      case 'users': return <Users />;
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderContent()}
    </Layout>
  );
}

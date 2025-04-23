"use client";

import { useState } from 'react';
import Image from 'next/image';
import SideNav from '../components/Sidebar';
import CampaignWinners from './CampaignWinners';
import RegistrationSpinner from './RegistrationSpinner';

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState('registration');

  return (
    <div className="relative font-outfit h-screen w-full overflow-hidden">
      <div className="absolute inset-0 ">
        
  
        
        <img
          src="/campaign/bg1.png"
          alt="Background"
          style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0}}
        />
        
      </div>

      {/* Main content container */}
      <div className="relative z-0 flex h-full">
        <div className="w-[320px]">
          <SideNav />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Left Panel */}
          <div className="w-[33%] border-r border-gray-600">
            <CampaignWinners 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
            />
          </div>

          {/* Right Panel */}
          <div className="w-[67%]">
            {activeTab === 'registration' && <RegistrationSpinner />}
            {activeTab === 'homeDeposits' && <RegistrationSpinner />}
            {activeTab === 'loanRepayment' && <RegistrationSpinner />}
          </div>
        </div>
      </div>
    </div>
  );
}

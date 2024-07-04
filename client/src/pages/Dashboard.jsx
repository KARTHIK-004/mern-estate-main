import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import DashSidebar from '../Alogrithm/DashSidebar';
import DashProfile from '../Alogrithm/DashProfile';
import DashUser from '../Alogrithm/DashUser';
import DashPosts from '../Alogrithm/DashPosts';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
      {/* users */}
      {tab === 'users' && <DashUser />}
      {/* posts... */}
      {tab === 'posts' && <DashPosts />}
    </div>
  );
}

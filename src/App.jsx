import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import TriageDashboard from './pages/TriageDashboard';
import Patients from './pages/Patients';
import Schedule from './pages/Schedule';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
import styles from './App.module.css';
import MotherDashboard from './motherApp/pages/MotherDashboard';
import MamaBot from "./motherApp/pages/MamaBot";
import NutritionGuide from "./motherApp/pages/NutritionGuide";

function AppLayout({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const hideSidebar = location.pathname.startsWith('/mother');

  return (
    <div className={styles.layout}>
      {!hideSidebar && (
        <Sidebar
          mobileOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
      )}

      <div className={hideSidebar ? styles.contentAreaNoSidebar : styles.contentArea}>
        {!hideSidebar && (
          <TopBar onMenuClick={() => setSidebarOpen(prev => !prev)} />
        )}

        <Routes>
          <Route path="/"          element={<TriageDashboard />} />
          <Route path="/patients"  element={<Patients />} />
          <Route path="/schedule"  element={<Schedule />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/reports"   element={<Reports />} />
          <Route path="/mother/home" element={<MotherDashboard />} />
          <Route path="/mother/chat" element={<MamaBot />} />
          <Route path="/mother/nutrition" element={<NutritionGuide />} />
          <Route path="*" element={<TriageDashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <AppLayout sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
    </BrowserRouter>
  );
}

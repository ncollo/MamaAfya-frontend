import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

// CHW Dashboard imports
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import TriageDashboard from "./pages/TriageDashboard";
import Patients from "./pages/Patients";
import Schedule from "./pages/Schedule";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";

// Mother Portal imports
import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Guide from "./pages/Guide";
import Weekly from "./pages/Weekly";
import Community from "./pages/Community";
import Profile from "./pages/Profile";

import styles from "./App.module.css";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* CHW Dashboard Routes */}
        <Route path="/chw/*" element={
          <div className={styles.layout}>
            <Sidebar mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className={styles.contentArea}>
              <TopBar onMenuClick={() => setSidebarOpen(prev => !prev)} />
              <Routes>
                <Route path="/" element={<TriageDashboard />} />
                <Route path="/patients" element={<Patients />} />
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/reports" element={<Reports />} />
              </Routes>
            </div>
          </div>
        } />

        {/* Mother Portal Routes */}
        <Route path="/*" element={
          <div>
            <TopNav />
            <main className={styles.main}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/guide" element={<Guide />} />
                <Route path="/weekly" element={<Weekly />} />
                <Route path="/community" element={<Community />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>
            <BottomNav />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}

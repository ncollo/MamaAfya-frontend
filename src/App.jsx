import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import TriageDashboard from "./pages/TriageDashboard";
import Patients from "./pages/Patients";
import Schedule from "./pages/Schedule";
import Inventory from "./pages/Inventory";
import Reports from "./pages/Reports";

import TopNav from "./components/TopNav";
import BottomNav from "./components/BottomNav";
import Home from "./pages/Home";
import Guide from "./pages/Guide";
import Weekly from "./pages/Weekly";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import Login from "./pages/Login";
import FacilityPortal from "./pages/FacilityPortal";
import PartnerPortal from "./pages/PartnerPortal";

import MotherDashboard from "./motherApp/pages/MotherDashboard";
import MamaBot from "./motherApp/pages/MamaBot";
import NutritionGuide from "./motherApp/pages/NutritionGuide";
import BirthPlan from "./motherApp/pages/BirthPlan";
import { AppStateProvider } from "./context/AppStateContext";
import { HomeRedirect, RequireAuth } from "./components/PortalShell";

import styles from "./App.module.css";

function CHWLayout() {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.contentArea}>
        <TopBar />
        <Routes>
          <Route path="/" element={<TriageDashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
}

function MotherLayout() {
  return (
    <div>
      <TopNav />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<MotherDashboard />} />
          <Route path="home" element={<MotherDashboard />} />
          <Route path="chat" element={<MamaBot />} />
          <Route path="birth-plan" element={<BirthPlan />} />
          <Route path="nutrition" element={<NutritionGuide />} />
          <Route path="guide" element={<Guide />} />
          <Route path="weekly" element={<Weekly />} />
          <Route path="community" element={<Community />} />
          <Route path="profile" element={<Profile />} />
          <Route path="notifications" element={<Notifications />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppStateProvider>
        <Routes>
          {/* Public login */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<HomeRedirect />} />

          {/* Door 2: CHW Dashboard */}
          <Route
            path="/chw/*"
            element={
              <RequireAuth allowedRoles={["chw"]}>
                <CHWLayout />
              </RequireAuth>
            }
          />

          {/* Door 3: Facility Portal */}
          <Route
            path="/facility/*"
            element={
              <RequireAuth allowedRoles={["facility_staff"]}>
                <FacilityPortal />
              </RequireAuth>
            }
          />

          {/* Door 4: Partner Interface */}
          <Route
            path="/partner/*"
            element={
              <RequireAuth allowedRoles={["partner"]}>
                <PartnerPortal />
              </RequireAuth>
            }
          />

          {/* Door 1: Mother PWA */}
          <Route
            path="/*"
            element={
              <RequireAuth allowedRoles={["mother"]}>
                <MotherLayout />
              </RequireAuth>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppStateProvider>
    </BrowserRouter>
  );
}

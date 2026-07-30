import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TopNav from './components/TopNav';
import BottomNav from './components/BottomNav';
import Home from './pages/Home';
import Guide from './pages/Guide';
import Weekly from './pages/Weekly';
import Community from './pages/Community';
import Profile from './pages/Profile';
import styles from './App.module.css';

export default function App() {
  return (
    <BrowserRouter>
      <TopNav />
      <main className={styles.main}>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/guide"     element={<Guide />} />
          <Route path="/weekly"    element={<Weekly />} />
          <Route path="/community" element={<Community />} />
          <Route path="/profile"   element={<Profile />} />
        </Routes>
      </main>
      <BottomNav />
    </BrowserRouter>
  );
}

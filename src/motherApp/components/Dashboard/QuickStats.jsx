import { Droplets, Heart, Wind } from "lucide-react";
import styles from "../../styles/MotherDashboard.module.css";

export default function QuickStats() {
  const stats = [
    {
      icon: <Droplets size={24} />,
      title: "Water",
      value: "5 / 8 Glasses",
      color: "#0EA5E9",
      bg: "#F0F9FF",
    },
    {
      icon: <Heart size={24} />,
      title: "Baby Kicks",
      value: "12 Today",
      color: "#E63946",
      bg: "#FFF1F2",
    },
    {
      icon: <Wind size={24} />,
      title: "Mood",
      value: "Good",
      color: "#8B5CF6",
      bg: "#F5F3FF",
    },
  ];

  return (
    <div className={styles.statsGrid}>
      {stats.map((item) => (
        <div
          key={item.title}
          className={styles.statCard}
          style={{ background: item.bg }}
        >
          <div
            className={styles.statIcon}
            style={{ color: item.color }}
          >
            {item.icon}
          </div>

          <h4>{item.title}</h4>

          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
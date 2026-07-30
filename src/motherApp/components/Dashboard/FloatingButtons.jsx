import { useState, useRef } from "react";
import { AlertTriangle } from "lucide-react";
import styles from "../../styles/MotherDashboard.module.css";

export default function FloatingButtons({ onChat }) {
  const [holding, setHolding] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activated, setActivated] = useState(false);

  const intervalRef = useRef(null);

  const startHold = () => {
    setHolding(true);
    setProgress(0);

    let value = 0;

    intervalRef.current = setInterval(() => {
      value += 5;
      setProgress(value);

      if (value >= 100) {
        clearInterval(intervalRef.current);
        setHolding(false);
        setActivated(true);
      }
    }, 100);
  };

  const stopHold = () => {
    clearInterval(intervalRef.current);
    setHolding(false);
    setProgress(0);
  };

  return (
    <>
      <div className={styles.fabContainer}>

        <button
          className={styles.chatFab}
          onClick={onChat}
        >
          👩‍⚕️
        </button>

        <button
          className={styles.emergencyFab}
          onMouseDown={startHold}
          onMouseUp={stopHold}
          onMouseLeave={stopHold}
          onTouchStart={startHold}
          onTouchEnd={stopHold}
          style={{
            background: holding
              ? `conic-gradient(#E63946 ${progress * 3.6}deg,#B00020 ${
                  progress * 3.6
                }deg)`
              : undefined,
          }}
        >
          <AlertTriangle size={28} />

          <span>HOLD</span>
        </button>

      </div>

      {activated && (

        <div className={styles.emergencyOverlay}>

          <div className={styles.alertBox}>

            <AlertTriangle
              size={60}
              color="white"
            />

            <h2>
              Emergency Activated
            </h2>

            <p>

              Contacting your Community Health Worker...

            </p>

            <p>

              Notifying the nearest Health Centre...

            </p>

            <div className={styles.connecting}>

              <span className={styles.dot}></span>

              Connecting...

            </div>

            <button
              className={styles.closeAlert}
              onClick={() => setActivated(false)}
            >
              Close
            </button>

          </div>

        </div>

      )}
    </>
  );
}
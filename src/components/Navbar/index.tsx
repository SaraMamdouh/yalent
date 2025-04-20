import React from "react";
import styles from "./index.module.css";
import { useAppointmentContext } from "src/providers/AppointmentProvider";

const Navbar: React.FC = () => {
  const { appointments,handleShowAppointments } = useAppointmentContext();

  return (
    <nav className={styles.navbar} aria-label="Navigation Links">
      <div className={styles.navbarLogo}>
        <a href="/">Logo</a>
      </div>
      <ul className={styles.navbarLinks} aria-label="Navigation Links">
        <li>
          <button 
        onClick={handleShowAppointments} 
        className={styles.navbarButton} 
        aria-label={`View your ${appointments.length} appointments`}
        type="button"
          >
        <span>Appointments</span>
        <span className={styles.badge} aria-hidden="true">
          {appointments.length}
        </span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

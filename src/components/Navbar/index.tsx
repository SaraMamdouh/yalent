import React from "react";
import styles from "./index.module.css";
import { useAppointmentContext } from "../../providers/AppointmentProvider";

const Navbar: React.FC = () => {
  const { appointments } = useAppointmentContext();

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <a href="/">Logo</a>
      </div>
      <ul className={styles.navbarLinks} aria-label="Navigation Links">
        <li>
          <span>Appointments</span>
          <span className={styles.badge} aria-label={`You have ${appointments.length} appointments`}>
        <span aria-hidden="true">{appointments.length}</span>
        <span className={styles.srOnly}>
          {appointments.length} 
        </span>
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

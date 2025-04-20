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
      <ul className={styles.navbarLinks}>
        <li>
          appointments
          <span className={styles.badge}>{appointments.length}</span>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

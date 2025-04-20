import { Appointment } from "../../providers/AppointmentProvider";
import styles from "./index.module.css";

type CardProps = {
  data: Appointment;
  handleAddAppointment: (data: Appointment) => void;
};

const Card: React.FC<CardProps> = ({ data, handleAddAppointment }) => {
  return (
    <div className={styles.card}>
      <img src={data.photo} alt={data.name} className={styles.cardImage} />
      <h2 className={styles.cardTitle}>{data.name}</h2>
      <p className={styles.cardContent}>{data.specialty}</p>
      <div className="flex flex-wrap gap-2 items-stretch justify-center">
        {data.availability.map((timeSlot) => (
          <p className={styles.tags}>{timeSlot}</p>
        ))}
      </div>
      <button
        onClick={() => handleAddAppointment(data)}
        className={styles.bookButton}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default Card;
export type { CardProps };

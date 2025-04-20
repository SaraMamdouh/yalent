import { Appointment } from "../../providers/AppointmentProvider";
import styles from "./index.module.css";

type CardProps = {
  data: Appointment;
  handleAddAppointment: (data: Appointment) => void;
};

const Card: React.FC<CardProps> = ({ data, handleAddAppointment }) => {
  return (
    <div
      className={styles.card}
      role="region"
      aria-labelledby={`card-title-${data.id}`}
      aria-describedby={`card-description-${data.id}`}
      aria-label={`Card for ${data.name}`}
    >
      <img
        src={data.photo}
        alt={`Photo of ${data.name}`}
        className={styles.cardImage}
      />
      <h2 className={styles.cardTitle} id={`card-title-${data.id}`}>
        {data.name}
      </h2>
      <p
        className={styles.cardContent}
        id={`card-description-${data.id}`}
      >
        {data.specialty}
      </p>
      <ul
        className="flex flex-wrap gap-2 items-stretch justify-center"
        aria-label={`Available time slots for ${data.name}`}
      >
        {data.availability.map((timeSlot, index) => (
          <li key={index} className={styles.tags}>
            {timeSlot}
          </li>
        ))}
      </ul>
      <button
        onClick={() => handleAddAppointment(data)}
        className={styles.bookButton}
        aria-label={`Book an appointment with ${data.name}`}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default Card;
export type { CardProps };
